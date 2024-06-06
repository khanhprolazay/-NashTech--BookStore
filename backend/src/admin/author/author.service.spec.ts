import { Test, TestingModule } from "@nestjs/testing";
import { AuthorService } from "./author.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { PrismaService } from "@/core/service/prisma.service";
import { v4 } from "uuid";

describe("AdminAuthorService", () => {
  let service: AuthorService;
  let prisma: PrismaService;
  let testName = v4();
  let authorId: string;

  beforeAll(async () => {
    const options: AppContext = {
      pagination: {
        limit: 10,
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        AuthorService,
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const author = await service.create({
      name: testName,
    });
    authorId = author.id;
  });

  afterEach(async () => {
    try {
      await service.delete(authorId);
    } catch (err) {}
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of authors", async () => {
    const authors = await service.findByPage(1);
    expect(authors).toBeDefined();
    expect(authors).toBeInstanceOf(Array);
    expect(authors.length).toBeGreaterThan(0);
  });

  it("Should create and update an author", async () => {
    const updatedAuthor = await service.update(authorId, {
      name: "asfasdfasd 1",
    });

    expect(updatedAuthor).toBeDefined();
    expect(updatedAuthor.name).toBe("asfasdfasd 1");
    expect(updatedAuthor.slug).toBe("asfasdfasd-1");
  });

  it("Should create and delete an author", async () => {
    await service.delete(authorId);
    const authors = await service.findAll();
    expect(authors).toBeInstanceOf(Array);
  });
});
