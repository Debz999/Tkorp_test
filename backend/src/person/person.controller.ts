import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PersonsService } from './person.service';
import { person, Prisma } from '@prisma/client';

@Controller('person')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() data: Prisma.personCreateInput): Promise<person> {
    return this.personsService.create(data);
  }

  @Get()
  findAll(): Promise<person[]> {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<person | null> {
    return this.personsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.personUpdateInput,
  ): Promise<person> {
    return this.personsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<person> {
    return this.personsService.remove(id);
  }
}
