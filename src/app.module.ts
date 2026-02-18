import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { TaskModule } from './task/task.module.js';
import { PrismaModule } from './shared/prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [UserModule, TaskModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
