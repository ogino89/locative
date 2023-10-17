import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto, user: ReqUserDto) {
    try {
      return await this.prismaService.property.create({
        data: {
          type: createPropertyDto.type,
          postalAddress: createPropertyDto.postalAddress,
          area: createPropertyDto.area,
          rental: createPropertyDto.rental,
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

  async findAll(prismaArgs: Prisma.PropertyDefaultArgs = {}, user: ReqUserDto) {
    try {
      const properties = await this.prismaService.property.findMany({
        where: {
          ownerId: user.id,
        },
        ...prismaArgs,
      });
      return properties;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(
    id: string,
    prismaArgs: Prisma.PropertyDefaultArgs = {},
    user: ReqUserDto,
  ) {
    try {
      const property = await this.prismaService.property.findUnique({
        where: { id, ownerId: user.id },
        ...prismaArgs,
      });
      if (!property) {
        throw new NotFoundException(`property with ref ${id} not found`);
      }
      return property;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    user: ReqUserDto,
  ) {
    const property = await this.findOne(id, {}, user);
    try {
      const updatedproperty = await this.prismaService.property.update({
        where: { id: property.id },
        data: updatePropertyDto,
      });
      return updatedproperty;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, user: ReqUserDto) {
    const property = await this.findOne(id, {}, user);
    return await this.prismaService.property.delete({
      where: { id: property.id },
    });
  }
}
