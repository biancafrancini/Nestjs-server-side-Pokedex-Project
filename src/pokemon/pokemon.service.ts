import { Injectable} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Connection, Model } from 'mongoose';
import { Pokemon, PokemonDocument } from './Pokemon.schema';
import { dtoCreatePokemon } from './dto/dtoCreatePokemon';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  createNewPokemon(dtoCreatePokemon: dtoCreatePokemon) {
  const createdPokemon = new this.pokemonModel(dtoCreatePokemon);
  createdPokemon.save();
  //console.log(createdPokemon.name);
  }

  async getPokemon(name: string): Promise<Pokemon> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      );
      const data = response.data;
      const pokemon: dtoCreatePokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_shiny,
      };
      //console.log(pokemon);
      return pokemon;
    
    } catch (err) {
      console.log(err);
    }
  }

  async getAllPokemon(): Promise<Pokemon[]> {
    const allPokemon= this.pokemonModel.find().exec();
    return allPokemon;
  }

  deletePokemon(id: string){
    return this.pokemonModel.deleteOne({id: String(id)});
  }
}
