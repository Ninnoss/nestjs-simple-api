import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import { DatabaseService } from './databse/database.service';
import { DatabaseService } from './databse/database.service';

@Module({
  imports: [UsersModule, DatabseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
