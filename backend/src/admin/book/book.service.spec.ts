import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { BookService } from "./book.service";
import { FileUploadModule } from "@/core/module/file-upload/file-upload.module";
import { OrderStatus } from "@prisma/client";

describe("BookService", () => {
  let service: BookService;
  let prisma: PrismaService;
  let bookId: string;
  let bookSlug: string;
  let categoryId: string;
  let authorId: string;

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
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);

    await Promise.all([
      prisma.$executeRaw`truncate "Book" cascade`,
      prisma.$executeRaw`truncate "Author" cascade`,
      prisma.$executeRaw`truncate "Category" cascade`,
      prisma.$executeRaw`truncate "Order" cascade`,
      prisma.$executeRaw`truncate "User" cascade`,
    ]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Create a book for each test
  beforeEach(async () => {
    const author = await prisma.author.create({
      data: {
        name: "John Doe",
        slug: "john-doe",
      },
    });
    const category = await prisma.category.create({
      data: {
        name: "Fiction",
        slug: "fiction",
      },
    });

    const book = await service.createBook(
      {
        title: "Fiction",
        description: "Def",
        price: "100",
        author: author.id,
        category: category.id,
      },
      {
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
      },
    );

    bookId = book.id;
    authorId = author.id;
    categoryId = category.id;
    bookSlug = book.slug;
  })

  // Delete the book after each test
  afterEach(async () => {
    await Promise.all([
      prisma.$executeRaw`truncate "Book" cascade`,
      prisma.$executeRaw`truncate "Author" cascade`,
      prisma.$executeRaw`truncate "Category" cascade`,
    ])
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of book", async () => {
    const categories = await service.findByPage(1);
    expect(categories).toBeDefined();
    expect(categories).toBeInstanceOf(Array);
    expect(categories.length).toBe(1);
    expect(categories[0].title).toBe("Fiction");
  });

  it("Should update a book", async () => {
    const updateBook = await service.update(bookId, {
      title: "Book",
      description: "Def",
    });
    expect(updateBook.title).toBe("Book");
    expect(updateBook.description).toBe("Def");
    expect(updateBook.slug).toBe("fiction");
    expect(updateBook.price).toBe(100);
  });

  it("Should find categories", async () => {
    const book = await service.findById(bookId);
    const categories = await service.findCategories(book);
    expect(categories).toBeDefined();
    expect(categories).toBeInstanceOf(Array);
    expect(categories.length).toBe(1);
  });

  it("Should find authors", async () => {
    const book = await service.findById(bookId);
    const authors = await service.findAuthors(book);
    expect(authors).toBeDefined();
    expect(authors).toBeInstanceOf(Array);
    expect(authors.length).toBe(1);
  });

  it("Should add a categry", async () => {
    const category = await prisma.category.create({
      data: {
        name: "Young Fiction",
        slug: "young-fiction",
      },
    });
    categoryId = category.id;
    await service.addCategory(bookId, category.id);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.categories).toBeDefined();
    expect(book.categories.length).toBe(2);
  });

  it("Should delete a category", async () => {
    await service.removeCategory(bookId, categoryId);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.categories).toBeDefined();
    expect(book.categories.length).toBe(0);
  });

  it("Should add a author", async () => {
    const author = await prisma.author.create({
      data: {
        name: "Jane Doe",
        slug: "jane-doe",
      },
    });
    authorId = author.id;
    await service.addAuthor(bookId, author.id);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.authors).toBeDefined();
    expect(book.authors.length).toBe(2);
  })

  it("Should delete a author", async () => {
    await service.removeAuthor(bookId, authorId);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.authors).toBeDefined();
    expect(book.authors.length).toBe(0);
  });

  it("Should not delete a book if it has an order", async () => {
    const user = await prisma.user.create({
      data: {
        id: "1",
        email: "",
        name: "",
        picture: "",
      },
    });

    await prisma.order.create({
      data: {
        userId: user.id,
        status: OrderStatus.PENDING,
        books: {
          create: {
            bookId: bookId,
            quantity: 1,
            price: 100,
            discount: 0,
          },
        },
      },
    });

    try {
      await service.delete(bookId);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("Should delete a book when there are no associated orders", async () => {
    await service.delete(bookId);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeNull();
  })
});
