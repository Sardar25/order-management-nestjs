import { Module } from '@nestjs/common';
import { OrderLogsService } from './order-logs.service';
import { OrderLogsController } from './order-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLog } from './entities/order-log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderLog])], 
  controllers: [OrderLogsController],
  providers: [OrderLogsService],
  exports:[OrderLogsService]
})
export class OrderLogsModule {}
