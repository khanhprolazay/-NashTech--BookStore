import { Controller, Get, Render, UseFilters, UseGuards } from "@nestjs/common";
import { CookieTokenGuard } from "@/core/guard/cookie-token.guard";
import { Client } from "@/core/decorator/client.decorator";
import { HttpExceptionFilter } from "../../core/filter/http-exception.filter";
import { Role } from "@/core/constant/user.constant";
import { Roles } from "@/core/decorator/roles.decorator";
import { RolesGuard } from "@/core/guard/roles.guard";
import { DashboardService } from "./dashboard.service";

@Controller("admin/dashboard")
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Render("dashboard")
  @Roles([Role.Admin])
  async dashboard(@Client() client: any) {
    const summerize = await this.dashboardService.summerize();
    return { client, title: "Dashboard", ...summerize };
  }
}
