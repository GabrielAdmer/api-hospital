import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty( { message: 'email es obligatorio' } )
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly role: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly google: boolean;
}

export class UpdateUserDto extends PartialType( CreateUserDto ) { }