import { PartialType } from '@nestjs/swagger';
import { CreateOwnerDto } from './create-owner.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
