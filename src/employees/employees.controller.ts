import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
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
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle() // this will skip the global throttler for this controller
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // add our custom logger to the controller
  private readonly logger = new MyLoggerService(EmployeesController.name);

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
  findAll(@Ip() ip: string, @Query('role') role: Role) {
    this.logger.log(
      `Finding all employees for \t ${ip}`,
      EmployeesController.name,
    );
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
