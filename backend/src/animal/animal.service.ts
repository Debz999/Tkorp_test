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

  //qui possede le plus d'animaux
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
      select: {
        id: true,
        lastName: true,
        firstName: true,
      },
    });

    if (!owner) return null;

    return {
      owner,
      animalCount: topGroup._count.id,
    };
  }

  //qui possede le plus de chat
  async mostCat() {
    const resultChat = await this.prisma.animal.groupBy({
      by: ['ownerId'],
      where: {
        species: 'cat',
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1,
    });
    if (resultChat.length === 0) {
      return null;
    }
    const idOwner = resultChat[0].ownerId;
    const catCount = resultChat[0]._count.id;
    if (idOwner === null || idOwner === undefined) return null;

    const owner = await this.prisma.person.findUnique({
      where: { id: idOwner },
      select: {
        id: true,
        lastName: true,
        firstName: true,
      },
    });
    if (!owner) {
      return null;
    }
    return {
      ownerName: owner.lastName,
      ownerFirstName: owner.firstName,
      ownerId: owner.id,
      numberOfCat: catCount,
    };
  }

  //animal le plus vieux
  async oldestAnimal() {
    interface OldestAnimalResult {
      name: string;
      species: string;
      breed: string;
      color: string;
      dateOfBirth: Date;
      age: number;
      lastName: string | null;
      firstName: string | null;
      email: string | null;
      phoneNumber: string | null;
    }

    const oldest = await this.prisma.$queryRaw<OldestAnimalResult[]>`
    SELECT 
      a.name,
      a.species,
      a.breed,
      a.color,
      a.dateOfBirth,
      TIMESTAMPDIFF(YEAR, a.dateOfBirth, CURDATE()) as age,
      p.lastName,
      p.firstName,
      p.email,
      p.phoneNumber
    FROM 
      Animal a
    LEFT JOIN 
      Person p ON a.ownerId = p.id
    ORDER BY 
      a.dateOfBirth ASC
    LIMIT 1
  `;

    if (!oldest || oldest.length === 0) return null;

    const result = oldest[0];

    return {
      animal: {
        name: result.name,
        species: result.species,
        breed: result.breed,
        color: result.color,
        dateOfBirth: result.dateOfBirth,
        age: Number(result.age),
      },
      owner: {
        lastName: result.lastName,
        firstName: result.firstName,
        email: result.email,
        phoneNumber: result.phoneNumber,
      },
    };
  }

  //espece le plus represente
  async mostRepresentedSpecies() {
    const result = await this.prisma.animal.groupBy({
      by: ['species'],
      _count: {
        species: true, // Utilisez un champ existant plutôt que _all
      },
      orderBy: {
        _count: {
          species: 'desc', // Trie par le count de species
        },
      },
      take: 1,
    });

    if (result.length === 0) return null;

    return {
      species: result[0].species,
      count: result[0]._count.species,
    };
  }

  //animal le plus lourd
  async heaviestAnimal() {
    const heaviestAnimal = await this.prisma.animal.findFirst({
      orderBy: { weight: 'desc' },
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        color: true,
        weight: true,
        ownerId: true,
      },
    });
    if (!heaviestAnimal || !heaviestAnimal.ownerId) return null;
    const owner = await this.prisma.person.findUnique({
      where: { id: heaviestAnimal.ownerId },
      select: {
        lastName: true,
        firstName: true,
        email: true,
        phoneNumber: true,
        id: true,
      },
    });

    if (!owner) return null;

    return {
      animal: {
        name: heaviestAnimal.name,
        species: heaviestAnimal.species,
        breed: heaviestAnimal.breed,
        color: heaviestAnimal.color,
        weight: heaviestAnimal.weight,
      },
      owner: {
        lastName: owner.lastName,
        firstName: owner.firstName,
        email: owner.email,
        phoneNumber: owner.phoneNumber,
        id: owner.id,
      },
    };
  }

  //groupe animaux le plus lourd

  async heaviestAnimalGroup() {
    const ownerAggregation = await this.prisma.animal.groupBy({
      by: ['ownerId'],
      _sum: {
        weight: true,
      },
      orderBy: {
        _sum: {
          weight: 'desc',
        },
      },
      take: 1,
    });

    if (ownerAggregation.length === 0 || !ownerAggregation[0].ownerId) {
      return null;
    }

    const ownerId = ownerAggregation[0].ownerId;
    const totalWeight = ownerAggregation[0]._sum.weight || 0;

    const owner = await this.prisma.person.findUnique({
      where: { id: ownerId },
      select: {
        lastName: true,
        firstName: true,
        email: true,
        phoneNumber: true,
        id: true,
      },
    });

    if (!owner) {
      return null;
    }

    const animals = await this.prisma.animal.findMany({
      where: { ownerId },
      select: {
        name: true,
        species: true,
        breed: true,
        color: true,
        weight: true,
      },
      orderBy: { weight: 'desc' },
    });

    return {
      owner,
      totalWeight,
      animals,
      animalCount: animals.length,
    };
  }
}
