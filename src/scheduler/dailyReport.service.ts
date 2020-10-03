import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisCacheService } from '../cache/redisCache.service';

@Injectable()
export class DailyReportService {
  private readonly logger = new Logger(DailyReportService.name);

  constructor(
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Cron('0 0 0 * * *')
  async handleCacheDailyReport() {
    this.logger.debug('Handle cache to Redis');
  }
}
