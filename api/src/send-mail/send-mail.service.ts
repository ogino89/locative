import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateRentCallDto } from 'src/rent-call/dto/create-rent-call.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SendMailService {
  @Inject(ConfigService)
  public config: ConfigService;

  constructor(private mailerService: MailerService) {}

  async sendMailToRentCall(rentCall: any) {
    const mailFrom: string = this.config.get('MAIL_FROM');
    const myDate = new Date(rentCall.month);
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();
    const moisEnMots = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
    const moisEnMot = moisEnMots[month];

    return await this.mailerService.sendMail({
      to: rentCall.tenant.email,
      cc: rentCall.tenant.owner.email,
      from: mailFrom,
      subject: 'Appel de loyer ✔',
      template: 'rent-call',
      context: {
        tenantfirstName: rentCall.tenant.firstName,
        tenantlastName: rentCall.tenant.lastName,
        tenantemail: rentCall.tenant.email,
        tenantpostalAddress: rentCall.tenant.postalAddress,
        tenantphone: rentCall.tenant.phone,
        ownerfirstName: rentCall.tenant.owner.firstName,
        ownerlastName: rentCall.tenant.owner.lastName,
        owneremail: rentCall.tenant.owner.email,
        ownerpostalAddress: rentCall.tenant.owner.postalAddress,
        propertytype: rentCall.tenant.property.type,
        propertyrental: rentCall.tenant.property.rental,
        propertyarea: rentCall.tenant.property.area,
        propertypostalAddress: rentCall.tenant.property.postalAddress,
        date: `${moisEnMot} ${year}`,
      },
    });
  }
}
