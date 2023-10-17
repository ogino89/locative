import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentCallDto } from './dto/create-rent-call.dto';
import { UpdateRentCallDto } from './dto/update-rent-call.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { SendMailService } from 'src/send-mail/send-mail.service';

@Injectable()
export class RentCallService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: SendMailService,
  ) {}

  async create(createRentCallDto: CreateRentCallDto) {
    try {
      const rentCall = await this.prismaService.rentCall.create({
        data: createRentCallDto,
        include: {
          tenant: {
            include: {
              owner: true,
              property: true,
            },
          },
        },
      });
      await this.mailService.sendMailToRentCall(rentCall);
      return rentCall;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Error prisma');
      }
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.RentCallDefaultArgs = {}, user: ReqUserDto) {
    try {
      const rentCalls = await this.prismaService.rentCall.findMany({
        where: {
          tenant: {
            ownerId: user.id,
          },
        },
        ...prismaArgs,
      });
      return rentCalls;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(
    id: string,
    prismaArgs: Prisma.RentCallDefaultArgs = {},
    user: ReqUserDto,
  ) {
    try {
      const rentCall = await this.prismaService.rentCall.findUnique({
        where: {
          id,
          tenant: {
            ownerId: user.id,
          },
        },
        ...prismaArgs,
      });
      if (!rentCall) {
        throw new NotFoundException(`rentCall with ref ${id} not found`);
      }
      return rentCall;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateRentCallDto: UpdateRentCallDto,
    user: ReqUserDto,
  ) {
    const rentCall = await this.findOne(id, {}, user);
    try {
      const updatedRentCall = await this.prismaService.rentCall.update({
        where: { id: rentCall.id },
        data: updateRentCallDto,
      });
      return updatedRentCall;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, user: ReqUserDto) {
    const rentCall = await this.findOne(id, {}, user);
    return await this.prismaService.rentCall.delete({
      where: { id: rentCall.id },
    });
  }
}
