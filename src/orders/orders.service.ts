import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OrderLog,
  OrderLogActions,
} from 'src/order-logs/entities/order-log.entity';
import { plainToInstance } from 'class-transformer';
import { OrderDetailDto } from './dto/order-detai.dto';
import { OrderLogsService } from 'src/order-logs/order-logs.service';
import { UserService } from 'src/user/user.service';
import { AssignRiderDto } from './dto/assign-rider.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly orderLogService: OrderLogsService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async create(loggerId: string, createOrderDto: CreateOrderDto) {
    return await this.dataSource.transaction(async (manager) => {
      const order = await manager.create(Order, createOrderDto);
      await manager.save(order);
      const logger = await this.userService.findById(loggerId);
      const orderLog = await manager.create(OrderLog, {
        action: OrderLogActions.Created,
        new_status: OrderStatus.Pending,
        order: order,
        logger: logger!,
      });
      await manager.save(orderLog);
      return plainToInstance(OrderDetailDto, order);
    });
  }

  async findAll(query:OrderQueryDto) {
    const { pageNo, pageSize, search, status } = query;

    const orders = this.orderRepo.createQueryBuilder('order');
    if(search){
      orders.andWhere(
        `order.customerName ILike :search OR order.customerNumber ILike :search OR order.customerAddress ILike :search`,
        { search:`%${search}%` }
      )
    }
    if(status){
      orders.andWhere(`order.status = :status`,{ status })
    }

    orders.skip((pageNo-1) * pageSize).take(pageSize);
    const [data, count]  = await orders.getManyAndCount();
    return ApiResponse.success({
      pageNo,
      pageSize,
      count,
      data
    })
  }

  async findOne(id: string) {
    const orderDetails = await this.orderRepo.findOneBy({ id })
    return plainToInstance(OrderDetailDto,  orderDetails, { excludeExtraneousValues:true });
  }

  async getOrderLogs(id:string){
    const orderDetails = await this.orderRepo.findOne({ where:{ id }, relations:['logs','logs.logger'] })
    return plainToInstance(OrderDetailDto,  orderDetails);
  }

 async assignRider(orderId:string, loggerId:string, assignRiderDto:AssignRiderDto ) {
     const order = await this.orderRepo.findOneBy({ id:orderId });
     if(!order){
      throw new NotFoundException();
     }
     const rider = await this.userService.findById(assignRiderDto.riderId);
     if(!rider){
      throw new NotFoundException();
     }
     const logger = await this.userService.findById(loggerId);

     return await this.dataSource.transaction(async (manager)=>{
        order.status=OrderStatus.Assigned;
        order.rider = rider;
        order.assigned_at = new Date(Date.now());

        await manager.save(order);

        const log = await manager.create(OrderLog,{
          logger: logger!,
          order,
          prev_status:OrderStatus.Pending,
          new_status: OrderStatus.Assigned,
          action:OrderLogActions.Assigned
        })

       await manager.save(log);

        return plainToInstance(OrderDetailDto, order,{ excludeExtraneousValues:true });
     });
  }

  async deliverOrder(orderId:string, riderId:string ) {
     const order = await this.orderRepo.findOneBy({ id:orderId });
     if(!order){
      throw new NotFoundException();
     }
     const rider = await this.userService.findById(riderId);
     if(!rider){
      throw new NotFoundException();
     }

     return await this.dataSource.transaction(async (manager)=>{
        order.status=OrderStatus.Delivered;
        order.delivered_at = new Date(Date.now());
        await manager.save(order);
        const log = manager.create(OrderLog,{
          logger: rider!,
          order,
          prev_status:OrderStatus.Picked,
          new_status: OrderStatus.Delivered,
          action:OrderLogActions.Delivered
        })

       await manager.save(log);

        return plainToInstance(OrderDetailDto, order,{ excludeExtraneousValues:true });
     });
  }

  async pickOrder(orderId:string, riderId:string ) {
     const order = await this.orderRepo.findOneBy({ id:orderId });
     if(!order){
      throw new NotFoundException();
     }
     const rider = await this.userService.findById(riderId);
     if(!rider){
      throw new NotFoundException();
     }

     return await this.dataSource.transaction(async (manager)=>{
        order.status=OrderStatus.Picked;
        order.picked_at = new Date(Date.now());
        await manager.save(order);
        const log = manager.create(OrderLog,{
          logger: rider!,
          order,
          prev_status:OrderStatus.Assigned,
          new_status: OrderStatus.Picked,
          action:OrderLogActions.Picked
        })

       await manager.save(log);
        return plainToInstance(OrderDetailDto, order,{ excludeExtraneousValues:true });
     });
  }
}
