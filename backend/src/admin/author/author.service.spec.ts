import { Test, TestingModule } from "@nestjs/testing";
import { AuthorService } from "./author.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { PrismaService } from "@/core/service/prisma.service";

describe("AdminAuthorService", () => {
  let service: AuthorService;
  let prisma: PrismaService;

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
    await prisma.$executeRaw`truncate "Author" cascade`;
  })

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of authors", async () => {
    const authors = await service.findByPage(1);
    expect(authors).toBeDefined();
    expect(authors).toBeInstanceOf(Array);
  });


  it("Should create and update an author", async () => {
    const author = await service.create({
      name: "John Doe",
    });

    const updatedAuthor = await service.update(author.id, {
      name: "Jane Doe",
    });

    expect(updatedAuthor).toBeDefined();
    expect(updatedAuthor.name).toBe("Jane Doe");
    expect(updatedAuthor.slug).toBe("jane-doe");
  })

  it("Should create and delete an author", async () => {
    const author = await service.create({
      name: "John Doe",
    });

    await service.delete(author.id);
    const authors = await service.findAll();
    expect(authors).toHaveLength(0);
  })
});
