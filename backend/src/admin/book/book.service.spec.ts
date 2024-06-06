import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { BookService } from "./book.service";
import { FileUploadModule } from "@/core/module/file-upload/file-upload.module";
import { OrderStatus } from "@prisma/client";
import { v4 } from "uuid";

describe("AdminBookService", () => {
  let service: BookService;
  let prisma: PrismaService;
  let bookId: string;
  let bookSlug: string;
  let categoryId: string;
  let authorId: string;
  let orderId: string;
  let userId: string;

  let serviceTestName: string

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
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Create a book for each test
  beforeEach(async () => {
    serviceTestName = v4()
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

    const book = await service.createBook(
      {
        title: serviceTestName,
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


    const user = await prisma.user.create({
      data: {
        id: serviceTestName,
        email: "",
        name: "",
        picture: "",
      },
    });

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: OrderStatus.PENDING,
        books: {
          create: {
            bookId: book.id,
            quantity: 1,
            price: 100,
            discount: 0,
          },
        },
      },
    });

    orderId = order.id;
    userId = user.id;
    bookId = book.id;
    authorId = author.id;
    categoryId = category.id;
    bookSlug = book.slug;
  });

  // Delete the book after each test
  afterEach(async () => {
    await Promise.all([
      prisma.bookToAuthor.deleteMany({ where: { bookId, authorId } }),
      prisma.bookToCategory.deleteMany({ where: { bookId, categoryId } }),
    ]);

    try {
      await Promise.all([
        prisma.author.delete({ where: { id: authorId } }),
        prisma.category.delete({ where: { id: categoryId } }),
        prisma.book.delete({ where: { id: bookId } }),
        prisma.order.delete({ where: { id: orderId } }),
        prisma.user.delete({ where: { id: userId } }),
      ]);
    } catch (error) {}
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of book", async () => {
    const categories = await service.findByPage(1);
    expect(categories).toBeDefined();
    expect(categories).toBeInstanceOf(Array);
  });

  it("Should update a book", async () => {
    const updateBook = await service.update(bookId, {
      title: "Book",
      description: "Def",
    });
    expect(updateBook.title).toBe("Book");
    expect(updateBook.description).toBe("Def");
    expect(updateBook.slug).toBe(serviceTestName);
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

  it("Should add a category", async () => {
    const name = v4()
    const category = await prisma.category.create({
      data: {
        name: name,
        slug: name,
      },
    });
    await service.addCategory(bookId, category.id);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.categories).toBeDefined();

    await prisma.bookToCategory.deleteMany({
      where: { bookId, categoryId: category.id },
    });
    await prisma.category.delete({ where: { id: category.id } });
  });

  it("Should delete a category", async () => {
    await service.removeCategory(bookId, categoryId);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.categories).toBeDefined();
  });

  it("Should add a author", async () => {
    const name = v4();
    const author = await prisma.author.create({
      data: {
        name,
        slug: name,
      },
    });
    await service.addAuthor(bookId, author.id);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.authors).toBeDefined();

    await prisma.bookToAuthor.deleteMany({
      where: { bookId, authorId: author.id },
    });
    await prisma.author.delete({ where: { id: author.id } });
  });

  it("Should delete a author", async () => {
    await service.removeAuthor(bookId, authorId);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeDefined();
    expect(book.authors).toBeDefined();
    expect(book.authors.length).toBe(0);
  });

  it("Should not delete a book if it has an order", async () => {
    try {
      await service.delete(bookId);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("Should delete a book when there are no associated orders", async () => {
    await prisma.orderToBook.deleteMany({ where: { bookId } });
    await prisma.order.deleteMany({ where: { id: orderId } });

    await service.delete(bookId);
    const book = await service.findBySlug(bookSlug);
    expect(book).toBeNull();
  });
});
