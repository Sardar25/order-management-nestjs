import { OrderLog } from "src/order-logs/entities/order-log.entity";
import { BaseEntity } from "../../common/entities/base.entity";
import { User } from "../../user/entities/user.entity";
import {  Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
export enum OrderStatus {
   Pending=1,
   Assigned,
   Picked,
   Delivered
}

@Entity()
export class Order extends BaseEntity
{
  @Column()
  customerName!:string

  @Column()
  customerNumber!:string

  @Column()
  customerAddress!:string
  
  @Column({ type:'enum', enum:OrderStatus, default:OrderStatus.Pending })
  status!:OrderStatus

  @Column({ nullable:true,type:'timestamp' })
  assigned_at!:Date

  @Column({ nullable:true, type:'timestamp' })
  picked_at!:Date

  @Column({ nullable:true, type:'timestamp' })
  delivered_at!:Date

  @ManyToOne(()=> User, (user)=> user.orders,{ onDelete:'NO ACTION' })
  @JoinColumn({ name:'assigned_to' })
  rider?: User 

  @OneToMany(()=>OrderLog, (orderLogs)=> orderLogs.order)
  logs?:OrderLog[]
}
