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
import { AnimalService } from './animal.service';
import { animal, Prisma } from '@prisma/client';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() data: Prisma.animalCreateInput): Promise<animal> {
    return this.animalService.create(data);
  }

  @Get()
  findAll(): Promise<animal[]> {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<animal | null> {
    return this.animalService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.animalUpdateInput,
  ): Promise<animal> {
    return this.animalService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<animal> {
    return this.animalService.remove(id);
  }

  @Get('owner-most-animals')
  OwnerWithMostAnimals() {
    return this.animalService.ownerWithMostAnimals();
  }
}
