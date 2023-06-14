import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {
    
  }

  ValidarLogin(usuario:string,password:string,token:string):Observable<any>{
    let headers=new HttpHeaders();
    headers= headers.append('Content-Type', 'application/json');
    headers= headers.append('access-token',token);
    
    
    const params = new HttpParams();
    params.set("usuario",usuario);
    params.set("password", password); //Create new HttpParams
     //return this.http.get(`${environment.apiUrl}/login`,{params:params});
     //let url=`${environment.apiUrl}/login?usuario=${JSON.stringify(usuario)}&password=${JSON.stringify(password)}`;
     return this.http.get(`${environment.apiUrl}/login?usuario=${usuario}&password=${password}`,{ 'headers': headers });
  }

  Token():Observable<any>{
     return this.http.get(`${environment.apiUrl}/token`);
  }

  
}
