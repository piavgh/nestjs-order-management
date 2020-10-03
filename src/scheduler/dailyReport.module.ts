import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../cache/redisCache.module';
import { DailyReportService } from './dailyReport.service';

@Module({
  imports: [RedisCacheModule],
  providers: [DailyReportService],
})
export class DailyReportModule {}
