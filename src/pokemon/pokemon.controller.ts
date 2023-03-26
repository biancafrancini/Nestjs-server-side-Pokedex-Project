import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { dtoCreatePokemon } from './dto/dtoCreatePokemon';
import { Pokemon } from './pokemon.schema';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async createData(@Body() dtoCreatePokemon: dtoCreatePokemon) {
    this.pokemonService.createNewPokemon(dtoCreatePokemon);
  }

  @Get(':name')
  getData(@Param('name') name: string): Promise<Pokemon> {
    return this.pokemonService.getPokemon(name);
  }

  @Delete(':id')
  deleteData(@Param('id') id: string){
    return this.pokemonService.deletePokemon(id);
  }
}
