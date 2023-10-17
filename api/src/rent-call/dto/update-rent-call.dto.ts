import { PartialType } from '@nestjs/swagger';
import { CreateRentCallDto } from './create-rent-call.dto';

export class UpdateRentCallDto extends PartialType(CreateRentCallDto) {}
