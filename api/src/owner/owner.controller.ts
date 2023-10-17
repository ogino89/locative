import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(
    private readonly ownerService: OwnerService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    return await this.ownerService.create(createOwnerDto);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.ownerService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.ownerService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ) {
    return await this.ownerService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ownerService.remove(id);
  }
}
