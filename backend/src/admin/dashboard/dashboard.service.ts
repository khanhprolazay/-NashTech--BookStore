import { PrismaService } from "@/core/service/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async summerize() {
    const [countOrder, countUser, bookView, sale] = await Promise.all([
      this.prismaService.order.count(),
      this.prismaService.user.count(),
      this.prismaService.analysis.aggregate({
        _sum: {
          totalView: true,
        },
      }),
      this.prismaService
        .$queryRaw`select SUM(price * (100 - discount) * quantity / 100) from "OrderToBook" otb `,
    ]);
    return { countOrder, countUser, bookView: bookView._sum.totalView, sale: sale[0].sum };
  }
}
