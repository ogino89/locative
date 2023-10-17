import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum EnumStausRentCall {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export class CreateRentCallDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  month: Date;

  @ApiProperty({ enum: EnumStausRentCall })
  @IsNotEmpty()
  @IsEnum(EnumStausRentCall)
  status: EnumStausRentCall;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  tenantId: string;
}
