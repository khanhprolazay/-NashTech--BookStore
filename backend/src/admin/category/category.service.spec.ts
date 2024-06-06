import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { v4 } from "uuid";

describe("AdminCategoryService", () => {
  let service: CategoryService;
  let prisma: PrismaService;
  let testName = v4();
  let categoryId: string;

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


  beforeEach(async () => {
    const category = await service.create({
      name: testName,
    });
    categoryId = category.id;
  })

  afterEach(async () => {
    try {
      await service.delete(categoryId);
    } catch (err) {}
  })

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of category", async () => {
    const categories = await service.findByPage(1);
    expect(categories).toBeDefined();
    expect(categories).toBeInstanceOf(Array);
    expect(categories.length).toBeGreaterThan(0);
  });


  it("Should create and update an category", async () => {
    const updateCategory = await service.update(categoryId, {
      name: "abc 123",
    });

    expect(updateCategory).toBeDefined();
    expect(updateCategory.name).toBe("abc 123");
    expect(updateCategory.slug).toBe("abc-123");
  })

  it("Should create and delete a category", async () => {
    await service.delete(categoryId);
    const category = await service.findById(categoryId);
    expect(category).toBeNull();
  })
});
