import { FileUploadModule } from "@/core/module/file-upload/file-upload.module";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { Test, TestingModule } from "@nestjs/testing";
import { BookService } from "./book.service";
import { BookService as AdminBookService } from "@/admin/book/book.service";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { Book } from "@prisma/client";
import { v4 } from "uuid";
import { IPagination, PaginationOrder, Sort } from "@/core/interface";

describe("GqlBookService", () => {
  let prisma: PrismaService;
  let adminBookService: AdminBookService;
  let bookService: BookService;
  let books: Book[];

  let serviceTestName: string;
  let categoryId: string;
  let authorId: string;

  let defaultPagination: IPagination = {
    page: 1,
    limit: 10,
    sort: Sort.POPULARITY,
    order: PaginationOrder.DESC,
    search: "",
  };

  let defaultBookFilter = {
    categories: [],
    authors: [],
    search: "",
  };

  beforeAll(async () => {
    const options: AppContext = {
      pagination: {
        limit: 10,
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [FileUploadModule],
      providers: [
        PrismaService,
        BookService,
        AdminBookService,
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    adminBookService = module.get<AdminBookService>(AdminBookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    serviceTestName = v4();
    const author = await prisma.author.create({
      data: {
        name: serviceTestName,
        slug: serviceTestName,
      },
    });
    const category = await prisma.category.create({
      data: {
        name: serviceTestName,
        slug: serviceTestName,
      },
    });

    let bookOptions = {
      description: "Def",
      author: author.id,
      category: category.id,
    };

    let file = {
      fieldname: "mainImage",
      originalname: "mainImage.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      buffer: Buffer.from(""),
      size: 0,
      stream: null,
      destination: "",
      filename: "",
      path: "",
    };

    const [book1, book2, book3] = await Promise.all([
      adminBookService.createBook(
        {
          title: v4(),
          price: "100",
          ...bookOptions,
        },
        file,
      ),
      adminBookService.createBook(
        {
          title: v4(),
          price: "150",
          ...bookOptions,
        },
        file,
      ),
      adminBookService.createBook(
        {
          title: v4(),
          price: "75",
          ...bookOptions,
        },
        file,
      ),
    ]);

    books = [book1, book2, book3];

    await Promise.all([
      prisma.analysis.update({
        where: {
          bookId: book1.id,
        },
        data: {
          totalView: 10,
          avarageRating: 4,
        },
      }),
      prisma.analysis.update({
        where: {
          bookId: book2.id,
        },
        data: {
          totalView: 100,
          avarageRating: 3,
        },
      }),
      prisma.analysis.update({
        where: {
          bookId: book3.id,
        },
        data: {
          totalView: 30,
          avarageRating: 5,
        },
      }),
    ]);

    authorId = author.id;
    categoryId = category.id;
  });

  afterEach(async () => {
    await Promise.all([
      prisma.bookToAuthor.deleteMany({ where: { authorId } }),
      prisma.bookToCategory.deleteMany({ where: { categoryId } }),
    ]);

    for (const book of books) {
      await adminBookService.delete(book.id);
    }

    books = [];
  });

  it("Should be defined", () => {
    expect(bookService).toBeDefined();
  });

  it("Should find by slug", async () => {
    const book = await bookService.findBySlug(books[0].slug);
    expect(book).toBeDefined();
    expect(book.title).toEqual(books[0].title);
  });

  it("Should find by polupar", async () => {
    const books = await bookService.findMany(
      defaultPagination,
      defaultBookFilter,
    );
    expect(books).toBeDefined();
    expect(books.books).toHaveLength(3);
    expect(books.books[0].analysis.totalView).toBe(100);
    expect(books.books[1].analysis.totalView).toBe(30);
    expect(books.books[2].analysis.totalView).toBe(10); 
  });

  it("Should find by recommend", async () => {
    const books = await bookService.findMany(
      {
        ...defaultPagination,
        sort: Sort.RECOMMEND,
      },
      defaultBookFilter,
    );
    expect(books).toBeDefined();
    expect(books.books).toHaveLength(3);
    expect(books.books[0].analysis.avarageRating).toBe(5);
    expect(books.books[1].analysis.avarageRating).toBe(4);
    expect(books.books[2].analysis.avarageRating).toBe(3);
  })

  it("Should find by price low to hight", async () => {
    const books = await bookService.findMany(
      {
        ...defaultPagination,
        sort: Sort.LOW,
      },
      defaultBookFilter,
    );
    expect(books).toBeDefined();
    expect(books.books).toHaveLength(3);
    expect(books.books[0].price).toBe(75);
    expect(books.books[1].price).toBe(100);
    expect(books.books[2].price).toBe(150);
  })

  it("Should find by price hight to low", async () => {
    const books = await bookService.findMany(
      {
        ...defaultPagination,
        sort: Sort.HIGH,
      },
      defaultBookFilter,
    );
    expect(books).toBeDefined();
    expect(books.books).toHaveLength(3);
    expect(books.books[0].price).toBe(150);
    expect(books.books[1].price).toBe(100);
    expect(books.books[2].price).toBe(75);
  })

  it("Should find by pagination", async () => {
    const books = await bookService.findMany(
      {
        ...defaultPagination,
        limit: 2,
      },
      defaultBookFilter,
    );
    expect(books).toBeDefined();
    expect(books.books).toHaveLength(2);
    expect(books.pagination.total).toBe(3);
    expect(books.pagination.page).toBe(1);
  })
});
