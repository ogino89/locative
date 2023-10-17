import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postalAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsMongoId()
  // ownerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  propertyId: string;
}
