import { Component, OnInit } from '@angular/core';
import { Carusel, CaruselFotos } from '../../interfaces/carusel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Fotos:Array<Carusel>=CaruselFotos;
  constructor() { 
    
  }

  ngOnInit(): void {
      
  }

}
