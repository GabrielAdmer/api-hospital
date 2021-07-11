import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreateHospitalDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  userId: number;

}

export class UpdateHospitalDto extends PartialType( CreateHospitalDto ) { }

