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
  
  offset:number=0
  limit:number=20
  currentPage:number = 1;
  listPagination:number[] = []
  cantidadDePaginas:number = 0;

  pokemonList:any[]=[];
  total:number =0;
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
  nextPage(){
    this.offset += this.limit;
    this.currentPage ++;
    this.getPokemons(this.limit, this.offset) 
  }
  prevPage(){
    this.offset -= this.limit;
    this.currentPage --;
    this.getPokemons(this.limit, this.offset) 
  }

  changeListPagination(page?:number){
    const maxLengthPage:number = 5;
    let desde:number;
    let hasta:number;
    let cantidad = Math.floor(this.total/this.limit); 
    this.cantidadDePaginas = cantidad + 1
    console.log(this.cantidadDePaginas);
    if(page){
      this.offset = (page-1) * this.limit
      this. currentPage = page
      this.getPokemons(this.limit, this.offset) 
    }

    if(this.currentPage <  maxLengthPage){
      desde = 1;
      hasta = this.cantidadDePaginas > maxLengthPage ?   maxLengthPage : this.cantidadDePaginas
    }else if(this.currentPage > this.cantidadDePaginas - maxLengthPage  ){
      desde = this.cantidadDePaginas - maxLengthPage
      hasta = this.cantidadDePaginas;
    }else{
      desde = this.currentPage - 2
      hasta = this.currentPage + 2
    }
    this.listPagination = Array.from({length:hasta - desde + 1},(_,i)=> desde + i )
  }
  getPokemons(limit?:number, offset?:number){
    this.pokemonList=[];
    this.pokemonService.getPokemons(limit, offset).subscribe((data:any)=>{
      this.next=data.next;
      this.prev=data.previous;
      this.total=data.count;
      if(!limit)this.changeListPagination(); 
      console.log(this.listPagination);
      data.results.map((pokemon:any)=>{
        this.pokemonService.getDataPokemon(pokemon.url).subscribe(dataxd=>{
          this.pokemonList=[...this.pokemonList , dataxd];
        })
      });
    });
  }
}
