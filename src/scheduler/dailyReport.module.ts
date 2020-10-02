import { Module } from '@nestjs/common';
import { DailyReportService } from './dailyReport.service';

@Module({
  providers: [DailyReportService],
})
export class DailyReportModule {}
