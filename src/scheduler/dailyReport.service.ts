import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DailyReportService {
  private readonly logger = new Logger(DailyReportService.name);

  @Cron('0 0 0 * * *')
  handleCacheDailyReport() {
    this.logger.debug('Handle cache to Redis');
  }
}
