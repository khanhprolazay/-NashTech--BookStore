import { BookService } from "@/admin/book/book.service";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { FileUploadModule } from "@/core/module/file-upload/file-upload.module";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { Test, TestingModule } from "@nestjs/testing";
import { v4 } from "uuid";
import { UserService } from "./user.service";
import { OrderStatus } from "@prisma/client";

describe("GqlUserService", () => {
  let prisma: PrismaService;
  let bookService: BookService;
  let userSerivce: UserService;
  let serviceTestName: string;

  let categoryId: string;
  let authorId: string;
  let bookId: string;
  let userId: string;

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
        UserService,
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    userSerivce = module.get<UserService>(UserService);
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

    bookId = book.id;
    userId = user.id;
    categoryId = category.id;
    authorId = author.id;
  });

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
        prisma.cart.deleteMany({ where: { userId } }),
        prisma.user.delete({ where: { id: userId } }),
      ]);
    } catch (error) {}
  });

  it("should be defined", () => {
    expect(userSerivce).toBeDefined();
  });

  it("should get orders", async () => {
    const orders = await userSerivce.findOrders(userId);
    expect(orders).toBeDefined();
  });

  it("should get cart", async () => {
    const cart = await userSerivce.findCart(userId);
    expect(cart).toBeDefined();
  });

  it("Should add book to cart", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 1,
    });
    const carts = await userSerivce.findCart(userId);
    expect(carts).toBeDefined();
    expect(carts).toHaveLength(1);
    expect(carts[0].book.id).toEqual(bookId);
    expect(carts[0].quantity).toEqual(1);
  });

  it("Should update book quantity in cart", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 1,
    });
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 2,
    });
    const carts = await userSerivce.findCart(userId);
    expect(carts).toBeDefined();
    expect(carts).toHaveLength(1);
    expect(carts[0].book.id).toEqual(bookId);
    expect(carts[0].quantity).toEqual(2);
  });

  it("Should not add none existed book to cart", async () => {
    try {
      await userSerivce.updateCart(userId, {
        bookId: v4(),
        quantity: 1,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("Should remove book from cart", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 1,
    });
    await userSerivce.removeCart(userId, bookId);
    const carts = await userSerivce.findCart(userId);
    expect(carts).toBeDefined();
    expect(carts).toHaveLength(0);
  });

  it("Should remove none existed book from cart", async () => {
    try {
      await userSerivce.removeCart(userId, v4());
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("Should checkout order", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 2,
    });

    const order = await userSerivce.checkoutOrder(userId);
    const [cart, analysis] = await Promise.all([
      userSerivce.findCart(userId),
      prisma.analysis.findFirst({
        where: {
          bookId,
        },
      }),
    ]);

    expect(cart).toBeDefined();
    expect(cart).toHaveLength(0);
    expect(order).toBeDefined();
    expect(order.status).toEqual(OrderStatus.PENDING);
    expect(order.books).toBeDefined();
    expect(order.books).toHaveLength(1);
    expect(order.books[0].quantity).toEqual(2);
    expect(order.books[0].book.id).toEqual(bookId);
    expect(analysis.totalOrder).toEqual(1);
    expect(analysis.totalOrderQuantity).toEqual(2);
  });

  it("Should review", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 2,
    });

    await userSerivce.checkoutOrder(userId);
    const review = await userSerivce.review(userId, {
      bookId,
      content: "Good",
      rating: 5,
      title: "Good",
    });
    const analysis = await prisma.analysis.findFirst({
      where: {
        bookId,
      },
    });

    expect(review).toBeDefined();
    expect(review.content).toEqual("Good");
    expect(analysis).toBeDefined();
    expect(analysis.totalReview).toEqual(1);
    expect(analysis.avarageRating).toEqual(5);
  });

  it("Should not review none existed book", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 2,
    });

    await userSerivce.checkoutOrder(userId);
    try {
      await userSerivce.review(userId, {
        bookId: v4(),
        content: "Good",
        rating: 5,
        title: "Good",
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("Should not review when user not buy book", async () => {
    try {
      await userSerivce.review(userId, {
        bookId,
        content: "Good",
        rating: 5,
        title: "Good",
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("Should review twice", async () => {
    await userSerivce.updateCart(userId, {
      bookId,
      quantity: 2,
    });

    await userSerivce.checkoutOrder(userId);
    await userSerivce.review(userId, {
      bookId,
      content: "Good",
      rating: 5,
      title: "Good",
    });
    await userSerivce.review(userId, {
      bookId,
      content: "Good",
      rating: 4,
      title: "Good",
    });
    const analysis = await prisma.analysis.findFirst({
      where: {
        bookId,
      },
    });

    expect(analysis).toBeDefined();
    expect(analysis.totalReview).toEqual(2);
    expect(analysis.avarageRating).toEqual(4.5);
  });
});
