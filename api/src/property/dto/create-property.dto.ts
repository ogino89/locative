import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum EnumTypeProperty {
  APARTMENT = 'APARTMENT',
  HOUSES = 'HOUSES',
}

export class CreatePropertyDto {
  @ApiProperty({ enum: EnumTypeProperty })
  @IsNotEmpty()
  @IsEnum(EnumTypeProperty)
  type: EnumTypeProperty;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rental: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postalAddress: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsMongoId()
  // ownerId: string;
}
