import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.scss']
})
export class IniciosesionComponent implements OnInit {
  formulario:FormGroup;
  email: AbstractControl;
  password:AbstractControl;

  constructor(private form:FormBuilder) {
    this.formulario=this.form.group({
      email:['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
    this.email= this.formulario.controls['email'];  
    this.password=this.formulario.controls['password'];
   }

  ngOnInit(): void {
  }

  inicioSesion(){

  }

}
