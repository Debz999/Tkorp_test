import { Module } from '@nestjs/common';
import { PersonsService } from './person.service';
import { PersonsController } from './person.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, PrismaService],
})
export class PersonsModule {}
