import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name!:string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!:string
}
