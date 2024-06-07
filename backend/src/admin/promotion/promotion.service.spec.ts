import { FileUploadModule } from "@/core/module/file-upload/file-upload.module";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { Test, TestingModule } from "@nestjs/testing";
import { PromotionService } from "./promotion.service";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { v4 } from "uuid";
import { BookService } from "../book/book.service";
import { Book, Promotion } from "@prisma/client";

describe("AdminPromotionService", () => {
  let promotionService: PromotionService;
  let prisma: PrismaService;
  let bookService: BookService;

  let categoryId: string;
  let authorId: string;
  let bookId: string;
  let userId: string;
  let promotionId: string;
  let serviceTestName: string;

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
        PromotionService,
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    promotionService = module.get<PromotionService>(PromotionService);
    bookService = module.get<BookService>(BookService);
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

    const book = await bookService.createBook(
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

    const promotion = await promotionService.create({
      title: serviceTestName,
      beginAt: new Date(),
      endAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      description: "",
    }, user.id);

    promotionId = promotion.id;
    bookId = book.id;
    userId = user.id;
    categoryId = category.id;
    authorId = author.id;
  });

  afterEach(async () => {
    await Promise.all([
      prisma.bookToAuthor.deleteMany({ where: { bookId, authorId } }),
      prisma.bookToCategory.deleteMany({ where: { bookId, categoryId } }),
      prisma.promotionToBook.deleteMany({ where: { promotionId } }),
    ]);

    await promotionService.delete(promotionId);

    try {
      await Promise.all([
        prisma.author.delete({ where: { id: authorId } }),
        prisma.category.delete({ where: { id: categoryId } }),
        prisma.book.delete({ where: { id: bookId } }),
        prisma.user.delete({ where: { id: userId } }),
      ]);
    } catch (error) {}
  });

  it("should be defined", () => {
    expect(promotionService).toBeDefined();
  });

  it("should create promotion", async () => {
    expect(promotionId).toBeDefined();
  });

  it("Should not create same title promotion", async () => {
    try {
      await promotionService.create({
        title: serviceTestName,
        beginAt: new Date(),
        endAt: new Date(),
        description: "",
      }, userId);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("Should not create promotion if beginAt is greater than endAt", async () => {
    try {
      await promotionService.create({
        title: "Test",
        beginAt: new Date(),
        endAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        description: "",
      }, userId);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("should add book to promotion", async () => {
    const result = await promotionService.addBook(promotionId, bookId, 10);
    expect(result.bookId).toEqual(bookId);
    expect(result.discount).toEqual(10);
  });

  it("Should update book discount", async () => {
    await promotionService.addBook(promotionId, bookId, 10);

    const result = await promotionService.updateBookDiscount(
      promotionId,
      bookId,
      20,
    );
    expect(result).toBeDefined();
    expect(result.discount).toEqual(20);
  });

  it("Should not add book if book is already added", async () => {
    await promotionService.addBook(promotionId, bookId, 10);

    try {
      await promotionService.addBook(promotionId, bookId, 10);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("Should not update book discount if book is not added", async () => {
    try {
      await promotionService.updateBookDiscount(promotionId, bookId, 10);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("Should remove book from promotion", async () => {
    await promotionService.addBook(promotionId, bookId, 10);
    const result = await promotionService.removeBook(promotionId, bookId);
    expect(result).toBeDefined();
  })

  it("Should not remove book from promotion if book is not added", async () => {
    try {
      await promotionService.removeBook(promotionId, bookId);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("Should update promotion", async () => {
    const result = await promotionService.update(promotionId, {
      title: "Updated",
      beginAt: new Date(),
      endAt: new Date(),
      description: "Updated",
    });
    expect(result).toBeDefined();
    expect(result.title).toEqual("Updated");
  })

  it("Should delete promotion", async () => {
    await promotionService.delete(promotionId);
    const promotion = await promotionService.findById(promotionId);
    expect(promotion).toBeNull();
  })

  it("Should not delete promotion if promotion is not found", async () => {
    try {
      await promotionService.delete(v4());
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("Should not delete promotion if promotion has books", async () => {
    await promotionService.addBook(promotionId, bookId, 10);

    try {
      await promotionService.delete(promotionId);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it("Should not add book to promotion if book is in another active promotion", async () => {
    const promotionId = v4();
    const promotionTmp = await promotionService.create({
      title: promotionId,
      beginAt: new Date(),
      endAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      description: "",
    }, userId);

    try {
      await promotionService.addBook(promotionId, bookId, 10);
    } catch (error) {
      expect(error).toBeDefined();
    }

    await promotionService.delete(promotionId);
  })
});
