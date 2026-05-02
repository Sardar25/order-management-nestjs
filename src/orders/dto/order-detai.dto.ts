
import { UserDetailDto } from 'src/user/dto/user-detail.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { OrderStatus } from '../entities/order.entity';
import { OrderLogDetailDto } from 'src/order-logs/dto/order-log-detail.dto';


@Exclude()
export class OrderDetailDto {
  @Expose()
  id!: string;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
  @Expose()
  deletedAt?: Date;
  @Expose()
  customerName!: string;
  @Expose()
  customerNumber!: string;
  @Expose()
  customerAddress!: string;
  @Expose()
  status!: OrderStatus;
  @Expose()
  assigned_at!: Date;
  @Expose()
  picked_at!: Date;
  @Expose()
  delivered_at!: Date;
  @Expose()
  @Type()
  rider?: UserDetailDto;
  @Expose()
  @Type(()=>OrderLogDetailDto)
  logs?: OrderLogDetailDto[];
}
