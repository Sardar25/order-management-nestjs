import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './common/config/database.config';
import { OrdersModule } from './orders/orders.module';
import { OrderLogsModule } from './order-logs/order-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=> getDatabaseConfig(configService)
    }),
    AuthModule, 
    UserModule, OrdersModule, OrderLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
