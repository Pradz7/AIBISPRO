import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [PrismaModule, DashboardModule, ProductsModule, CategoriesModule, AnalyticsModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
