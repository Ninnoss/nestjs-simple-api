import { CreateUserDto } from './create-user-dto';
import { PartialType } from '@nestjs/mapped-types';

// the update DTO extends the create DTO, so it inherits all the properties from the create DTO. Not all properties are required for the update, so we use PartialType to make the update DTO partial.

export class UpdateUserDto extends PartialType(CreateUserDto) {}
