import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { APP_CONTEXT } from "../constant/app.constant";
import { AppContext } from "../type/app-context.type";

@Injectable()
export abstract class BaseService<T> {
  constructor(
    @Inject(APP_CONTEXT) protected readonly appContext: AppContext,
    protected readonly client: PrismaService,
  ) {}

  abstract model();

  count(): Promise<number> {
    return this.model().count();
  }

  findAll(): Promise<T[]> {
    return this.model().findMany();
  }

  findById(id: string): Promise<T> {
    return this.model().findFirst({
      where: {
        id,
      },
    });
  }

  findBySlug(slug: string): Promise<T> {
    return this.model().findFirst({
      where: {
        slug,
      },
    });
  }

  findFirstByName(name: string): Promise<T> {
    return this.model().findFirst({
      where: {
        name,
      },
    });
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.model().findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  getAll(): Promise<T[]> {
    return this.model().findMany();
  }

  create(data: Partial<Exclude<T, "id">>): Promise<T> {
    return this.model().create({ data });
  }

  update(id: string, data: Partial<Exclude<T, "id" | "slug">>): Promise<T> {
    return this.model().update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model().delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
