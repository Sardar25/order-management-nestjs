import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateOrderDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerName!:string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerNumber!:string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerAddress!:string

}




