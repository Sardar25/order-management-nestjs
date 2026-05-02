import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RefreshTokenDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    refreshToken!:string
}