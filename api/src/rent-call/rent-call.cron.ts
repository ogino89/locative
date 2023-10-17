import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RentCallService } from './rent-call.service';
import { TenantService } from 'src/tenant/tenant.service';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { EnumStausRentCall } from './dto/create-rent-call.dto';

@Injectable()
export class RentCallCron {
  private readonly logger = new Logger(RentCallCron.name);

  constructor(
    private readonly rentCallService: RentCallService,
    private readonly tenantService: TenantService,
    private readonly mailService: SendMailService,
  ) {}

  @Cron('0 0 1 * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 45');
    const tenants = await this.tenantService.findAllNoUser();
    await Promise.all(
      tenants.map(async (tenant) => {
        const rentCall = await this.rentCallService.create({
          tenantId: tenant.id,
          status: EnumStausRentCall.PENDING,
          amount: tenant.property.rental,
          month: new Date(),
        });
        await this.mailService.sendMailToRentCall(rentCall);
      }),
    );
  }
}
