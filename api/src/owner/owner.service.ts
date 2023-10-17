import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { selectUserQuery } from 'src/helper/query/query';

@Injectable()
export class OwnerService {
  constructor(private prismaService: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    try {
      const hasedPassword = await bcrypt.hash(
        createOwnerDto.password,
        await bcrypt.genSalt(10),
      );
      createOwnerDto.password = hasedPassword;
      const createdOwner = await this.prismaService.owner.create({
        data: createOwnerDto,
        select: selectUserQuery,
      });
      return createdOwner;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exist');
        } else {
          throw error;
        }
      }
      // Handle validation error
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Error prisma');
      }
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.OwnerDefaultArgs = {}) {
    try {
      const owners = await this.prismaService.owner.findMany({
        select: selectUserQuery,
        ...prismaArgs,
      });
      return owners;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.OwnerDefaultArgs = {}) {
    try {
      const owner = await this.prismaService.owner.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!owner) {
        throw new NotFoundException(`owner with id ${id} not found`);
      }
      return owner;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Provided hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.findOne(id);
    try {
      const updatedOwner = await this.prismaService.owner.update({
        where: { id: owner.id },
        select: selectUserQuery,
        data: updateOwnerDto,
      });
      return updatedOwner;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const owner = await this.findOne(id);
    try {
      return this.prismaService.owner.delete({ where: { id: owner.id } });
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const owner = this.prismaService.owner.findFirst({
        where: { email },
      });
      if (!owner) {
        throw new NotFoundException(`owner with email ${email} not found`);
      }
      return owner;
    } catch (error) {
      throw error;
    }
  }
}
