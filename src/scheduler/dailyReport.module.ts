import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../cache/redisCache.module';
import { OrdersModule } from '../orders/orders.module';
import { DailyReportService } from './dailyReport.service';

@Module({
  imports: [
    RedisCacheModule,
    OrdersModule,
  ],
  providers: [DailyReportService],
})
export class DailyReportModule {}
