import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formulario:FormGroup;
  pais:Array<any>=[
    {
    id:1,
    nombre:"Colombia"},
    {
      id:2,
      nombre:"Chile"
    }];

  constructor(private form:FormBuilder) {
     this.formulario=this.form.group({

      rut:['',[Validators.required, Validators.pattern("[0-9]{1,10}\-[K|k|0-9]")]],
      nombre:['',Validators.required],
      pais: ['', [Validators.required]]
    });


   }

  ngOnInit() {
  }

  Registrarse(){
      
  }

}
