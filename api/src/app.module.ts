import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OwnerModule } from './owner/owner.module';
import { HelperModule } from './helper/helper.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { RentCallModule } from './rent-call/rent-call.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SendMailModule } from './send-mail/send-mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    HelperModule,
    AuthModule,
    OwnerModule,
    PropertyModule,
    TenantModule,
    RentCallModule,
    SendMailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
