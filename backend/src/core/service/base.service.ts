import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export abstract class BaseService<T> {
  constructor(protected readonly client: PrismaService) {}

  abstract model();

  findAll(): Promise<T[]> {
    return this.model().findMany();
  }

  findById(id: string): Promise<T> {
    return this.model().findFirst({ where: { id } });
  }

  findBySlug(slug: string): Promise<T> {
    return this.model().findFirst({ where: { slug } });
  }

  findFirstByName(name: string): Promise<T> {
    return this.model().findFirst({ where: { name } });
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.model().findMany({ where: { id: { in: ids } } });
  }

  getAll(): Promise<T[]> {
    return this.model().findMany();
  }

  create(data: Partial<Exclude<T, 'id'>>): Promise<T> {
    return this.model().create({ data });
  }

}
