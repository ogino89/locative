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
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Property')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('property')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  async create(@Request() req, @Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyService.create(createPropertyDto, req.user);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Request() req, @Query('args') prismaArgs: string) {
    return await this.propertyService.findAll(
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
    return await this.propertyService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
      req.user,
    );
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return await this.propertyService.update(id, updatePropertyDto, req.user);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.propertyService.remove(id, req.user);
  }
}
