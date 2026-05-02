import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuthGuard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { UserDetailDto } from './dto/user-detail.dto';

@ApiBearerAuth()
@Role('Admin')
@UseGuards(JwtAuthGuard,RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findById(id);
    if(user){
      return plainToInstance(UserDetailDto,user);
    }
    throw new NotFoundException(`user with id=(${id}) not found`)
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  softDelete(@Param('id',ParseUUIDPipe) id: string) {
    return this.userService.softDelete(id);
  }
}
