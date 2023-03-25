import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [PokemonModule, MongooseModule.forRoot("mongodb+srv://Bianca999:vOTLo8rBM52RxpTt@cluster0.qzeh71x.mongodb.net/test")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}