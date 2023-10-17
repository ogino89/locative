import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class TenantService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTenantDto: CreateTenantDto, user: ReqUserDto) {
    try {
      return await this.prismaService.tenant.create({
        data: {
          email: createTenantDto.email,
          firstName: createTenantDto.firstName,
          lastName: createTenantDto.lastName,
          phone: createTenantDto.phone,
          postalAddress: createTenantDto.postalAddress,
          propertyId: createTenantDto.propertyId,
          ownerId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Error prisma');
      }
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.TenantDefaultArgs = {}, user: ReqUserDto) {
    try {
      const tenants = await this.prismaService.tenant.findMany({
        where: {
          ownerId: user.id,
        },
        ...prismaArgs,
      });
      return tenants;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(
    id: string,
    prismaArgs: Prisma.TenantDefaultArgs = {},
    user: ReqUserDto,
  ) {
    try {
      const tenant = await this.prismaService.tenant.findUnique({
        where: { id, ownerId: user.id },
        ...prismaArgs,
      });
      if (!tenant) {
        throw new NotFoundException(`tenant with ref ${id} not found`);
      }
      return tenant;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(id: string, updateTenantDto: UpdateTenantDto, user: ReqUserDto) {
    const tenant = await this.findOne(id, {}, user);
    try {
      const updatedtenant = await this.prismaService.tenant.update({
        where: { id: tenant.id },
        data: updateTenantDto,
      });
      return updatedtenant;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, user: ReqUserDto) {
    const tenant = await this.findOne(id, {}, user);
    return await this.prismaService.tenant.delete({
      where: { id: tenant.id },
    });
  }

  async findAllNoUser(prismaArgs: Prisma.TenantDefaultArgs = {}) {
    try {
      const tenants = await this.prismaService.tenant.findMany({
        include: {
          owner: true,
          property: true,
        },
        ...prismaArgs,
      });
      return tenants;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }
}
