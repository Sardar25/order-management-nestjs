import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseUUIDPipe, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuthGuard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AssignRiderDto } from './dto/assign-rider.dto';
import { OrderQueryDto } from './dto/order-query.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Role('Admin')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@GetUser('userId') userId:string, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(userId,createOrderDto);
  }

  
  @Get()
  findAll(@Query() query: OrderQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('/:id/order-logs')
  getOrderLogs(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderLogs(id);
  }


  @Put('/:id/assign-rider')
  assignRider(@Param('id',ParseUUIDPipe) orderId:string, @GetUser('userId') loggerId:string, @Body() assignRiderDto:AssignRiderDto){
     return this.ordersService.assignRider(orderId, loggerId, assignRiderDto);
  }

  @Role('User')
  @Put('/:id/pick-order')
  pickOrder(@Param('id',ParseUUIDPipe) orderId:string, @GetUser('userId') riderId:string){
     return this.ordersService.pickOrder(orderId, riderId);
  }

  @Role('User')
  @Put('/:id/deliver-order')
  deliverOrder(@Param('id',ParseUUIDPipe) orderId:string, @GetUser('userId') riderId:string){
     return this.ordersService.deliverOrder(orderId, riderId);
  }



}
