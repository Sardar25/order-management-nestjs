import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {

    @ApiProperty({ example: 'admin@oms.com' })
    @IsEmail()
    @IsNotEmpty()
    email!:string

    @ApiProperty({ example:'Password' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!:string
}