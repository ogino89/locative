import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RentCallService } from './rent-call.service';
import { CreateRentCallDto } from './dto/create-rent-call.dto';
import { UpdateRentCallDto } from './dto/update-rent-call.dto';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Rent-call')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rent-call')
export class RentCallController {
  constructor(
    private readonly rentCallService: RentCallService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  async create(@Body() createRentCallDto: CreateRentCallDto) {
    return await this.rentCallService.create(createRentCallDto);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Request() req, @Query('args') prismaArgs: string) {
    return await this.rentCallService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
      req.user,
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(
    @Request() req,
    @Param('id') id: string,
    @Query('args') prismaArgs: string,
  ) {
    return await this.rentCallService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
      req.user,
    );
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRentCallDto: UpdateRentCallDto,
  ) {
    return await this.rentCallService.update(id, updateRentCallDto, req.user);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.rentCallService.remove(id, req.user);
  }
}
