import { Order } from 'src/orders/entities/order.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderLog } from 'src/order-logs/entities/order-log.entity';

export enum RoleEnum {
  User = 'User',
  Admin = 'Admin',
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true })
  refreshTokenExpiresAt?: Date;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.User,
  })
  role!: RoleEnum;

  @OneToMany(()=> Order, (order)=> order.rider)
  orders?:Order[]

  @OneToMany(()=> OrderLog, (orderLog)=> orderLog.logger)
  logs?:OrderLog[]
}
