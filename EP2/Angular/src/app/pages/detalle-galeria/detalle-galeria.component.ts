import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GaleriasService} from '../../services/galerias.service';
import { Galeria } from '../../interfaces/galeria';




@Component({
  selector: 'app-detalle-galeria',
  templateUrl: './detalle-galeria.component.html',
  styleUrls: ['./detalle-galeria.component.scss']
})


export class DetalleGaleriaComponent implements OnInit{
  ruta2:any;
  id:number=0;
  datos:Array<Galeria>=[];
  detalleGaleria!: Galeria;

  constructor(private ServicioGaleria:GaleriasService,private ruta:ActivatedRoute) {
      
  }
  ngOnInit(): void {

    this.ServicioGaleria.getJSON().subscribe(data=>{
      for(let i=0;i<data.length;i++)
         this.datos.push(data[i]);
      
      
      this.ruta2=this.ruta.params.subscribe(parametros=>{
        this.id=parametros['id'];       
        this.detalleGaleria=this.datos[this.id];
        console.log(this.detalleGaleria);
      });
          
   });

   
   


  }

     
}
