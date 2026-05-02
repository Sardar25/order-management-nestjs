import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderQueryDto {
  @ApiProperty()
  @IsOptional()
  @Type(()=> Number)
  @IsInt()
  @Min(1)
  pageNo: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(()=> Number)
  pageSize: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  @Type(()=> Number)
  status?: OrderStatus;


}