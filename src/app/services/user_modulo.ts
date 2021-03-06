import { Usuario_modulo } from './../models/user_modulo';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()

export class User_moduloService {

  public url: String;
  public identity;
  public token: string;
  public usuario_perfil: Usuario_modulo;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getUsuarios_modulo(id:any) {

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'usuario_modulo/'+id, options)
      .map(res => res.json());
  }

  saveUser_modulo(userModulo: any) {

    let json = JSON.stringify(userModulo);
    let params = json;


    let headers = new Headers({ 'Content-Type': 'application/json'});

    return this._http.post(this.url + 'usuario_modulo', params, { headers: headers })
      .map(res => res.json());
  }

  
  updateUser_modulo(id: String, user_perfil: any) {

    const json = JSON.stringify(user_perfil);
    const params = json;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.put(this.url + 'usuario_modulo/' + id, params, { headers: headers })
      .map(res => res.json());
  }


}
