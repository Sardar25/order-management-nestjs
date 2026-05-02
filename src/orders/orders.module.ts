import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderLogsModule } from 'src/order-logs/order-logs.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]), OrderLogsModule, UserModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
