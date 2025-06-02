import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalModule } from './animal/animal.module';
import { PersonsModule } from './person/person.module';

@Module({
  imports: [AnimalModule, PersonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
