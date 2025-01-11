// DTO stands for Data Transfer Object. It is a class that represents the data that will be sent to the server from the client.
// NOTE: It is recommended to use classes instead of types for DTOs. This is because the DTO class can be used to validate the data before reaching the server. If we use types, they will removed from the compiled code, which can lead to errors.

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'intern', 'engineer'], {
    message: 'Role must be one of: admin, intern, or engineer',
  })
  role: Role;
}

export type Role = 'admin' | 'intern' | 'engineer';
