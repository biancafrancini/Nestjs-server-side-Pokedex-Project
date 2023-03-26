import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from './Pokemon.schema';
import { dtoCreatePokemon } from './dto/dtoCreatePokemon';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  /**
   * @description function to save a new Pokemon instance in the database
   * @param dtoCreatePokemon structure of the new Pokemon instance that will be created
   */
  createNewPokemon(dtoCreatePokemon: dtoCreatePokemon) {
  const createdPokemon = new this.pokemonModel(dtoCreatePokemon);
  createdPokemon.save();
  //console.log(createdPokemon.name);
  }

  /**
   * @description function that get data from https://pokeapi.co/api/v2/pokemon/ regarding only one pokemon by given name
   * @param name name of the pokemon we want to get
   * @return new pokemon with the same Schema Pokemon ({id,name,image})
   */
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

  /**
   * @description function that remove instances from database by id
   * @param id id of the single Pokemon instance we want to delete from database
   * @return database list of Pokemons objects without the one with the given id
   */
  deletePokemon(id: string){
    return this.pokemonModel.deleteOne({id: String(id)});
  }


  /* async function in case we need to get all pokemons data
  async getAllPokemon(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec();  
  }*/
}
