import { Exclude, Expose } from 'class-transformer';
import { RoleEnum } from '../entities/user.entity';

@Exclude()
export class UserDetailDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: RoleEnum;

  @Expose()
  createdAt!: Date

  @Expose()
  updatedAt!: Date

}