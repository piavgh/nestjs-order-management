import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { RedisCacheModule } from "./cache/redisCache.module";
import { ProductsModule } from './products/products.module';
import { OrdersModule } from "./orders/orders.module";
import { DailyReportModule } from './scheduler/dailyReport.module';
import { ReportModule } from './report/report.module';
import { AuthenticationMiddleware } from "./middleware/authentication.middleware";
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    RedisCacheModule,
    ProductsModule,
    OrdersModule,
    DailyReportModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('products', 'orders');
  }
}
