// DTO stands for Data Transfer Object. It is a class that represents the data that will be sent to the server from the client.
// NOTE: It is recommended to use classes instead of types for DTOs. This is because the DTO class can be used to validate the data before reaching the server. If we use types, they will removed from the compiled code, which can lead to errors.

export class CreateUserDto {
  name: string;
  email: string;
  role: Role;
}

export type Role = 'admin' | 'intern' | 'engineer';
