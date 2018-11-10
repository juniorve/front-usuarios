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

  getUsuarios_perfil() {

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'usuario_perfil', options)
      .map(res => res.json());
  }

}
