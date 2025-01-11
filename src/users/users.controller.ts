import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@Controller('users') // this is the path to the controller: api/users
export class UsersController {
  // The UsersService is injected into the `UsersController` via the constructor using NestJS's Dependency Injection system. This ensures the same instance of the service is reused wherever it is needed, avoiding redundant instances and promoting efficient resource usage.
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or GET /users?role=value
  findAll(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }

  // the most specific route has to be used last. Any route that comes after it, the segment after /users will be treated as the path parameter
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // the ParseIntPipe is a built-in NestJS pipe that converts the string to a number before the param reaches the route handler
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteOne(id);
  }
}
