import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent implements OnChanges {
  @Input() pokemon:any;
  @Input() statusModal:boolean = false;
  @Output() statusModalChangeEmit = new EventEmitter<boolean>();
  @Output()  dataPokemonEmit = new EventEmitter<any>();
  intervalId: any;
  status:boolean = this.statusModal;
  spriteIndex:number=0;
  sprites:string[] = [];  
  constructor(private pokemonService:PokemonService) { }

  


  ngOnChanges(changes: SimpleChanges): void {
    this.status = this.statusModal;
    if(this.pokemon !== undefined){
      console.log(this.pokemon);
      Object.keys(this.pokemon.sprites).map((key) => {
        if(this.pokemon.sprites[key] !== null && typeof this.pokemon.sprites[key] === "string" ){
          this.sprites.push(this.pokemon.sprites[key]);
        }
      })
      this.spriteIndex = 0;
      this.intervalId = setInterval(() => {
        this.nextValSprite();
      }, 200);
    }else{
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
  
    }
  }
  closeModal(){
    this.status = false;
    this.statusModalChangeEmit.emit(this.status);
    this.dataPokemonEmit.emit(undefined);
    this.sprites = [];
  }

  nextValSprite(){
    if(this.spriteIndex < this.sprites.length-1){
      this.spriteIndex++;
    }else{
      this.spriteIndex = 0;
    }
  }

  preventChildClick(event: MouseEvent): void {
    event.stopPropagation(); // Detener la propagación del evento hacia el padre
  }
  
}
