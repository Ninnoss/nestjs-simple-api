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
  ValidationPipe,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/update-employee-dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle() // this will skip the global throttler for this controller
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // this also works for validation and it provides more customization options
  // @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeesService.create(createEmployeeDto);
  // }

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // this will not skip the global throttler for this route only - it will be rate-limited
  @Get()
  findAll(@Query('role') role: Role) {
    return this.employeesService.findAll(role);
  }

  // override the global throttler for this route
  @Throttle({
    short: { ttl: 1000, limit: 1 },
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
