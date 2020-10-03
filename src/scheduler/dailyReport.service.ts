import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { format } from 'date-fns';
import { RedisCacheService } from '../cache/redisCache.service';
import OrdersService from '../orders/orders.service';

@Injectable()
export class DailyReportService {
  private readonly logger = new Logger(DailyReportService.name);

  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly ordersService: OrdersService,
  ) {}

  private static getReportDate() {
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    return format(yesterday, 'yyyy-MM-dd');
  }

  @Cron('0 1 0 * * *') // Run cron job at 00:01:00 everyday
  async handleCacheDailyReport() {
    this.logger.debug('Caching daily report to Redis');

    const dailyReport = await this.ordersService.queryDailyReport();

    await this.redisCacheService.set(
      DailyReportService.getReportDate(),
      dailyReport,
    );
  }
}
