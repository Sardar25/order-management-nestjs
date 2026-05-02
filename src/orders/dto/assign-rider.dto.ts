import { ParseUUIDPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AssignRiderDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    riderId!:string
}