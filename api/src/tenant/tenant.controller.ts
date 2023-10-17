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
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Tenant')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  async create(@Request() req, @Body() createTenantDto: CreateTenantDto) {
    return await this.tenantService.create(createTenantDto, req.user);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Request() req, @Query('args') prismaArgs: string) {
    return await this.tenantService.findAll(
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
    return await this.tenantService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
      req.user,
    );
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return await this.tenantService.update(id, updateTenantDto, req.user);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.tenantService.remove(id, req.user);
  }
}
