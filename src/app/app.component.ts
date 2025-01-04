import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from "./component/info-card/info-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InfoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'practica-springboot';
  pokemonList:any[]=[];
  next:string="";
  prev:string="";
  statusModal:boolean=false;
  dataPokemon:any;
  pokemonTypeColors: { [key: string]: string } = {
    normal: '#A8A77A', // Beige
    fighting: '#C22E28', // Rojo oscuro
    flying: '#A98FF3', // Lila claro
    poison: '#A33EA1', // Púrpura
    ground: '#E2BF65', // Marrón claro
    rock: '#B6A136', // Marrón oscuro
    bug: '#A6B91A', // Verde
    ghost: '#735797', // Púrpura oscuro
    steel: '#B7B7CE', // Gris metálico
    fire: '#EE8130', // Naranja
    water: '#6390F0', // Azul
    grass: '#7AC74C', // Verde claro
    electric: '#F7D02C', // Amarillo
    psychic: '#F95587', // Rosa
    ice: '#96D9D6', // Celeste
    dragon: '#6F35FC', // Morado oscuro
    dark: '#705746', // Marrón grisáceo
    fairy: '#D685AD', // Rosa claro
    stellar: '#FFD700', // Dorado (para algo especial como "stellar")
    unknown: '#68A090', // Gris verdoso (por ser tipo desconocido)
  };

  constructor(private pokemonService:PokemonService) {}

  ngOnInit(): void {
    this.getPokemons(); 
  }
  getDataPokemon(data:any){
    this.dataPokemon=data;
    this.statusModal = true;
  }
  
  dataPokemonChildren(data:any){
    this.dataPokemon=data;
  }
  statusModalChangeChildren(status:boolean){
    this.statusModal=status;
  }

  getPokemons(url?:string){
    this.pokemonList=[];
    this.pokemonService.getPokemons(url).subscribe((data:any)=>{
      this.next=data.next;
      this.prev=data.previous;
      data.results.map((pokemon:any)=>{
        this.pokemonService.getDataPokemon(pokemon.url).subscribe(dataxd=>{
          this.pokemonList=[...this.pokemonList , dataxd];
        })
      });
    });
  }
}
