import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { person, Prisma } from '@prisma/client';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.personCreateInput): Promise<person> {
    return this.prisma.person.create({ data });
  }

  async findAll(): Promise<person[]> {
    return this.prisma.person.findMany();
  }

  async findOne(id: number): Promise<person | null> {
    return this.prisma.person.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.personUpdateInput): Promise<person> {
    return this.prisma.person.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<person> {
    return this.prisma.person.delete({ where: { id } });
  }
}
