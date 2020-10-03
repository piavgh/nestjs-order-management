import { Injectable } from '@nestjs/common';
import { format, addDays } from 'date-fns';
import { RedisCacheService } from '../cache/redisCache.service';
import GetDailyReportDto from './dto/getDailyReport.dto';

@Injectable()
export default class ReportService {
  constructor(
    private redisCacheService: RedisCacheService,
  ) {}

  /**
   * Get list of dates between 2 dates
   *
   * @param startDate
   * @param endDate
   * @private
   */
  private static getListOfDates(startDate, endDate) {
    const datesList = [];
    let currentDate = new Date(startDate);
    const stopDate = new Date(endDate);
    while (currentDate <= stopDate) {
      datesList.push(format(new Date(currentDate), 'yyyy-MM-dd'));
      currentDate = addDays(new Date(currentDate), 1);
    }

    return datesList;
  }

  async getDailyReport(params: GetDailyReportDto) {
    const datesList = ReportService.getListOfDates(params.startDate, params.endDate);
    const dailyReport = await this.redisCacheService.getMany(datesList);

    const result = {};
    datesList.forEach((key, i) => result[key] = dailyReport[i]);

    return result;
  }
}
