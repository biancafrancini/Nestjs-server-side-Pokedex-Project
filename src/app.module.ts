import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiPipeModule } from 'nestjs-joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PokemonModule, JoiPipeModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.URL_DB)],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
