import { Injectable } from '@nestjs/common';
import { Analysis } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';

@Injectable()
export class AnalysisService extends BaseService<Analysis> {
  model() {
    return this.client.analysis;
  }
}
