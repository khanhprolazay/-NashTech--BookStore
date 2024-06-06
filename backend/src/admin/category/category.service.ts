import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { BaseService } from "@/core/service/base.service";
import { Dto } from "@/core/type/utility.type";
import { Util } from "@/core/util/util";

@Injectable()
export class CategoryService extends BaseService<Category> {
  model() {
    return this.client.category;
  }

  findByPage(page: number) {
    return this.client.$queryRaw
    ` select c."id", c."name" , count(b.title) count
      from "Category" c 
      left join "BookToCategory" btc on c.id = btc."categoryId"  
      left join "Book" b on btc."bookId"  = b.id 
      group  by c.id , c."name" 
      order by count desc
      limit ${this.appContext.pagination.limit}
      offset ${(page - 1) * this.appContext.pagination.limit}
    ` as Promise<Category[]>;
  }

  override create(data: Dto<Category>) {
    const slug = Util.slugify(data.name);
    return this.model().create({
      data: {
        ...data,
        slug,
      },
    });
  }

  override update(id: string, data: Dto<Category>) {
    const slug = Util.slugify(data.name);
    return this.model().update({
      where: {
        id,
      },
      data: {
        ...data,
        slug,
      },
    });
  }
}
