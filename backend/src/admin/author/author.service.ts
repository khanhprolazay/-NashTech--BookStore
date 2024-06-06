import { Injectable } from "@nestjs/common";
import { Author } from "@prisma/client";
import { BaseService } from "@/core/service/base.service";
import { Dto } from "@/core/type/utility.type";
import { Util } from "@/core/util/util";

@Injectable()
export class AuthorService extends BaseService<Author> {
  model() {
    return this.client.author;
  }

  findByPage(page: number) {
    return this.client.$queryRaw` select a.id , a."name" , count(b.title) count
      from "Author" a 
      left join "BookToAuthor" bta on bta."authorId" = a.id 
      left join "Book" b on bta."bookId"  = b.id 
      group by a.id, a."name" 
      order by count desc
      limit ${this.appContext.pagination.limit}
      offset ${(page - 1) * this.appContext.pagination.limit}
    `;
  }

  override create(data: Dto<Author>) {
    const slug = Util.slugify(data.name);
    return this.client.author.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  override update(id: string, data: Dto<Author>) {
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
