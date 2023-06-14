import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

import {LoginService} from '../login.service';
import {StorageService} from '../storage.service';
import {Session} from '../session';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  formulario:FormGroup;
  mensaje:string="";
  datos:Session;
  token:string="";
  logueado:Boolean=false;
  
  constructor(private form:FormBuilder, private servicio:LoginService, private storage:StorageService) {
    this.formulario=this.form.group({
       usuario:['',[Validators.required, Validators.email]],
       password:['',Validators.required],
       rut: ['', [Validators.pattern("[0-9]-"),Validators.max(9)]]
     });
  }


  ngOnInit(){
    /*let datos= JSON.parse(localStorage.getItem('sitiomovil'));
    if(datos && datos.usuario){
        window.location.href="/privado";
    }*/

    if(this.storage.getCurrentUser()){
      this.logueado=true;
      this.mensaje="Usted ya se encuentra logueado";
    }

  }

  ValidarLogin(){
    /*
    if(this.formulario.get("usuario").value=='pepito' && this.formulario.get("password").value=='123'){
      localStorage.setItem('sitiomovil',JSON.stringify({"usuario":this.formulario.get("usuario").value,"password":this.formulario.get("password").value}));
    }
    */
      
      this.servicio.Token().subscribe(token=>{
         this.token=token;
         this.servicio.ValidarLogin(this.formulario.get("usuario").value, this.formulario.get("password").value,this.token).subscribe(datos=>{
          console.log(datos);
          if(datos.length==0){
                this.mensaje="Login no existe";
           }else{
              datos={token:datos[0].id,usuario:datos[0].correo_electronico};
              this.storage.CrearSession(datos);
              window.location.href="/home";
              
           }
      })
      });
    
      
      
  }

}
