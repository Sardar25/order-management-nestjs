import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDetailDto } from './dto/user-detail.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async save(user: User) {
    return await this.userRepo.save(user);
  }
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
    });
    await this.userRepo.save(user);
    return plainToInstance(UserDetailDto, user, {
      excludeExtraneousValues: true,
    });
  }

  findAll() {
    const usersList = this.userRepo.find();
    return plainToInstance(UserDetailDto, usersList, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string) {
    return await this.userRepo.findOneBy({ id });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const cleanDto = Object.fromEntries(
      Object.entries(updateUserDto).filter(([_, v]) => v !== undefined),
    );
    Object.assign(user, cleanDto);
    await this.userRepo.save(user);
    return plainToInstance(UserDetailDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateToken(id: string, token: string | undefined) {
    return await this.userRepo.update({ id: id }, { refreshToken: token });
  }
  async softDelete(id: string) {
    await this.userRepo.softDelete(id);
    return ApiResponse.empty("User deleted successfully")
  }
}
