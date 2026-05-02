import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiHeaders } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/JwtAuthGuard';
import { JwtRefreshGuard } from './guard/JwtRefreshAuthGuard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/refresh-token')
  refreshToken(
    @Headers('authorization') authHeader: string,
    @Body() dto: RefreshTokenDto,
  ) {
    const token = authHeader?.split(' ')?.[1];
    return this.authService.refreshToken(token, dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Req() req) {
    return this.authService.profile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@GetUser('userId') id:string) {
    return this.authService.logout(id);
  }
}
