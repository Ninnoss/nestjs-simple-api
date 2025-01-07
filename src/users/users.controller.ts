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

@Controller('users') // this is the path to the controller: api/users
export class UsersController {
  @Get() // GET /users or GET /users?role=value
  findAll(@Query('role') role?: 'admin' | 'intern' | 'engineer') {
    return role ? { role } : [];
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }

  // the most specific route has to be used last. Any route that comes after it, the segment after /users will be treated as the path parameter
  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id: id };
  }

  @Post() // POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') // PATCH /users/:id
  updateOne(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // DELETE /users/:id
  deleteOne(@Param('id') id: string) {
    return { id };
  }
}
