import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  URL:string = "https://pokeapi.co/api/v2/pokemon";
  constructor(private httpClient:HttpClient) { }

  getPokemons(limit?:number , offset?:number ){
    if(limit && offset){
      return this.httpClient.get(this.URL+"?offset="+offset+"&limit="+limit);
    }
    return this.httpClient.get(this.URL);
  }

  getDataPokemon(url:string){
    return this.httpClient.get(url);
  }

}
