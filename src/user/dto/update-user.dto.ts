import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()

  @ValidateIf((_, v) => v !== undefined)
  @IsString()
  @IsNotEmpty()
  name?: string;
}
