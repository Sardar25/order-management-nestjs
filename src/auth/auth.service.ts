import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { UserDetailDto } from 'src/user/dto/user-detail.dto';
import { plainToClass } from 'class-transformer';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userExist = await this.userService.findByEmail(email);
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const payload = {
        sub: userExist.id,
        email: userExist.email,
        role: userExist.role,
      };
      const { accessToken, refreshToken } = this.generateTokens(payload);
      userExist.refreshToken = await bcrypt.hash(refreshToken,12);
      userExist.refreshTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      // userExist.refreshToken =refreshToken;
      await this.userService.save(userExist);
      return {
        accessToken,
        refreshToken,
        user: plainToClass(UserDetailDto, userExist, { excludeExtraneousValues:true })
      };
    }
    throw new UnauthorizedException('Invalid Email or Password');
  }

  async refreshToken(expiredToken: string, refToken: string) {
    if(!expiredToken){
      throw new UnauthorizedException();
    }
    const decodedToken = await this.jwtService.decode(expiredToken);
    const user = await this.userService.findById(decodedToken.sub);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }
    if(new Date() > user.refreshTokenExpiresAt! || !(await bcrypt.compare(refToken, user.refreshToken))){    
      await this.userService.save(user);
      throw new UnauthorizedException();
    }

    const { refreshToken, accessToken } = this.generateTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    user.refreshToken = await bcrypt.hash(refreshToken, 12);
    await this.userService.save(user);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(userId:string) {
     const user = await this.userService.findById(userId);
     //@ts-ignore
     user.refreshToken = null;
     //@ts-ignore
     user.refreshTokenExpiresAt = null;
     await this.userService.save(user!);
     return ApiResponse.empty('Loggoed Out Successfully');
  }

  async profile(id:string) {
    const user = await this.userService.findById(id);
    if(user) {
      return plainToClass(UserDetailDto,user,{ excludeExtraneousValues:true });
    }
    throw new UnauthorizedException();
  }

  private generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = randomBytes(32).toString('hex');
    return {
      accessToken,
      refreshToken,
    };
  }


 
}
