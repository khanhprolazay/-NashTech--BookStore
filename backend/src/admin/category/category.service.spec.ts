import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";


describe("AdminCategoryService", () => {
  let service: CategoryService;
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
        CategoryService,
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.$executeRaw`truncate "Category" cascade`;
  })

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of category", async () => {
    const categories = await service.findByPage(1);
    expect(categories).toBeDefined();
    expect(categories).toBeInstanceOf(Array);
  });


  it("Should create and update an category", async () => {
    const category = await service.create({
      name: "Fiction",
    });

    const updateCategory = await service.update(category.id, {
      name: "Young Fiction",
    });

    expect(updateCategory).toBeDefined();
    expect(updateCategory.name).toBe("Young Fiction");
    expect(updateCategory.slug).toBe("young-fiction");
  })

  it("Should create and delete an category", async () => {
    const author = await service.create({
      name: "Fiction",
    });

    await service.delete(author.id);
    const authors = await service.findAll();
    expect(authors).toHaveLength(0);
  })
});
