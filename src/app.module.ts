import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/database.module';
import { DatabaseService } from './databse/database.service';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseService } from './databse/database.service';

@Module({
  imports: [UsersModule, DatabseModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
