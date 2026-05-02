import { Exclude, Expose, Type } from "class-transformer"
import { OrderStatus } from "src/orders/entities/order.entity"
import { OrderLogActions } from "../entities/order-log.entity"
import { UserDetailDto } from "src/user/dto/user-detail.dto"


@Exclude()
export class OrderLogDetailDto {

  @Expose()
  id!:string

  @Expose()
  created_at!: Date
  
  @Expose()
  prev_status?: OrderStatus

  @Expose()
  new_status?: OrderStatus

  @Expose()
  action!:OrderLogActions

  @Expose()
  @Type()
  logger?:UserDetailDto

}
