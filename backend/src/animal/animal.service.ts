import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { animal, Prisma } from '@prisma/client';

@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.animalCreateInput): Promise<animal> {
    return this.prisma.animal.create({ data });
  }

  async findAll(): Promise<animal[]> {
    return this.prisma.animal.findMany();
  }

  async findOne(id: number): Promise<animal | null> {
    return this.prisma.animal.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.animalUpdateInput): Promise<animal> {
    return this.prisma.animal.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<animal> {
    return this.prisma.animal.delete({ where: { id } });
  }

  async ownerWithMostAnimals() {
    const result = await this.prisma.animal.groupBy({
      by: ['ownerId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1,
    });

    if (!result.length) return null;

    const topGroup = result[0];
    const personId = topGroup.ownerId;

    if (personId === null || personId === undefined) return null;

    const owner = await this.prisma.person.findUnique({
      where: { id: personId },
    });

    if (!owner) return null;

    return {
      owner,
      animalCount: topGroup._count.id,
    };
  }
}
