import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../cache/redisCache.module';
import ReportController from './report.controller';
import ReportService from './report.service';

@Module({
  imports: [RedisCacheModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
