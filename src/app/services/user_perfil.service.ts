import { Usuario_perfil } from './../models/user_perfil';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()

export class User_perfilService {

  public url: String;
  public identity;
  public token: string;
  public usuario_perfil: Usuario_perfil;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getUsuarios_perfil(id:any) {

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'usuario_perfil/'+id, options)
      .map(res => res.json());
  }

  getUsuario_perfil() {

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'usuario_perfil', options)
      .map(res => res.json());
  }

  saveUser_perfil(userPerfil: Usuario_perfil) {

    let json = JSON.stringify(userPerfil);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json'});

    return this._http.post(this.url + 'usuario_perfil', params, { headers: headers })
      .map(res => res.json());
  }

  updateUser_perfil(id: String, user_perfil: any) {

    const json = JSON.stringify(user_perfil);
    const params = json;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.put(this.url + 'usuario_perfil/' + id, params, { headers: headers })
      .map(res => res.json());
  }


}
