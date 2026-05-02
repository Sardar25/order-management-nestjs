import { BaseEntity } from "src/common/entities/base.entity";
import { Order, OrderStatus } from "src/orders/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum OrderLogActions  {
   Created='Order_Added',
   Assigned='Order_Assigned',
   Picked='Order_Picked',
   Delivered='Order_Delivered'
}

@Entity()
export class OrderLog extends BaseEntity {
  @Column({ nullable:true })
  prev_status?: OrderStatus

  @Column({ nullable:true })
  new_status?: OrderStatus

  @Column({ type:'enum', enum:OrderLogActions })
  action!:OrderLogActions

  @ManyToOne(()=>Order, (order)=> order.logs)
  @JoinColumn({ name:'order_id' })
  order!:Order

  @ManyToOne(()=> User, (user)=> user.logs)
  @JoinColumn({ name:'logged_by' })
  logger?:User

}
