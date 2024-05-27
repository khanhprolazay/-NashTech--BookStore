import { Controller } from "@nestjs/common";
import { PromotionService } from "./promotion.service";

@Controller('admin/promotion')
export class PromotionController {
  constructor(private promotionService: PromotionService) {}
}