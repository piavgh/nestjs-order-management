import { Body, Controller, Post} from '@nestjs/common';
import GetDailyReportDto from './dto/getDailyReport.dto';
import ReportService from './report.service';

@Controller('report')
export default class ReportController {
  constructor(
    private readonly reportService: ReportService
  ) {}

  @Post()
  async createOrder(@Body() params: GetDailyReportDto) {
    return this.reportService.getDailyReport(params);
  }
}
