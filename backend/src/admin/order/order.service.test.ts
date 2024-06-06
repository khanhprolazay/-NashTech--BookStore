import { AppContext } from "@/core/type/app-context.type";
import { Test, TestingModule } from "@nestjs/testing";
import { OrderService } from "./order.service";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { PrismaService } from "@/core/service/prisma.service";
import { BookService } from "../book/book.service";
import { OrderStatus } from "@prisma/client";
import { v4 } from "uuid";

describe("AdminOrderService", () => {
  let orderService: OrderService;
  let bookService: BookService;
  let prisma: PrismaService;
  let bookId: string;
  let bookSlug: string;
  let orderId: string;
  let authorId: string;
  let categoryId: string;

  let serviceTestName = v4();

  beforeAll(async () => {
    const options: AppContext = {
      pagination: {
        limit: 10,
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        OrderService,
        BookService,
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    bookService = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
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

    const order = await prisma.order.create({
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
    orderId = order.id;
    bookId = book.id;
    bookSlug = book.slug;
    authorId = author.id;
    bookId = book.id;
  })

  afterEach(async () => {
    await Promise.all([
      prisma.bookToAuthor.deleteMany({ where: { bookId, authorId}}),
      prisma.bookToCategory.deleteMany({ where: { bookId, categoryId}}),
    ])

    await Promise.all([
      prisma.author.delete({ where: { id: authorId }, }),
      prisma.category.delete({ where: { id: categoryId } }),
      prisma.book.delete({ where: { id: bookId } }),
    ])
  });

  it("should find many orders", async () => {
    const orders = await orderService.findMany();
    expect(orders).toHaveLength(1);
    expect(orders[0].id).toEqual(orderId);
    expect(orders[0].user.id).toEqual("1");
    expect(orders[0].books[0].book.title).toEqual("Fiction");
  })

  it("Should tracking order", async () => {
    const order = await orderService.tracking(orderId, OrderStatus.DELIVERED);
    expect(order.status).toEqual(OrderStatus.DELIVERED);
  })
})