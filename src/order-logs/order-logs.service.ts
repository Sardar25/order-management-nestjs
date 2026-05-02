import { Injectable } from '@nestjs/common';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLog } from './entities/order-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderLogsService {

  constructor(
      @InjectRepository(OrderLog)
      private readonly orderLogRepo: Repository<OrderLog>
    ){
  
    }
  async create(createOrderLogDto: CreateOrderLogDto) {
    const orderLog = this.orderLogRepo.create(createOrderLogDto);
    await this.orderLogRepo.save(orderLog);
    return orderLog;
  }

  findAll() {
    return `This action returns all orderLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderLog`;
  }

  update(id: number, updateOrderLogDto: UpdateOrderLogDto) {
    return `This action updates a #${id} orderLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderLog`;
  }
}
