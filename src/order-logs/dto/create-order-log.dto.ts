import { Order, OrderStatus } from "src/orders/entities/order.entity"
import { OrderLogActions } from "../entities/order-log.entity"
import { User } from "src/user/entities/user.entity"

export class CreateOrderLogDto {
  prev_status?: OrderStatus

  new_status?: OrderStatus

  action!:OrderLogActions

  order!:Order

  logger?:User
}
