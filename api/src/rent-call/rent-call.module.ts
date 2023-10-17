import { Module } from '@nestjs/common';
import { RentCallService } from './rent-call.service';
import { RentCallController } from './rent-call.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RentCallCron } from './rent-call.cron';
import { TenantModule } from 'src/tenant/tenant.module';
import { SendMailModule } from 'src/send-mail/send-mail.module';

@Module({
  imports: [PrismaModule, TenantModule, SendMailModule],
  controllers: [RentCallController],
  providers: [RentCallService, RentCallCron],
})
export class RentCallModule {}
