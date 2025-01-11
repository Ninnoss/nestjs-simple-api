import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Role, User, UsersService } from './users.service';

@Controller('users') // this is the path to the controller: api/users
export class UsersController {
  // we use injectibale to inject the service into the controller. NestJS will automatically inject the service into the controller and make it available to the methods. If the class is used elsewhere it will pull it from there avoiding creating the class twice
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  updateOne(@Param('id') id: string, @Body() userUpdate: User) {
    return this.usersService.updateOne(+id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(+id);
  }
}
