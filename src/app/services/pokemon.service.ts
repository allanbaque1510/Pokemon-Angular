import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient:HttpClient) { }

  getPokemons(url:string | undefined){
    if(url){
      return this.httpClient.get(url);
    }
    return this.httpClient.get("https://pokeapi.co/api/v2/pokemon");
  }

  getDataPokemon(url:string){
    return this.httpClient.get(url);
  }

}
