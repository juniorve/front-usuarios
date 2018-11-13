import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { User } from '../models/user';


@Injectable()

export class UserService {

  public url: String;
  public identity;
  public token: string;
  public usuario: User;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }


  getUser(id: any) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'usuarios/' + id, options).map(res => res.json());
  }

  updateUser(id: String, user: any) {

    const json = JSON.stringify(user);
    const params = json;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.put(this.url + 'usuarios/' + id, params, { headers: headers })
      .map(res => res.json());
  }

  saveUser(user: User) {

    let json = JSON.stringify(user);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json'});

    return this._http.post(this.url + 'usuarios', params, { headers: headers })
      .map(res => res.json());
  }

  getUsuarios() {

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'usuarios', options)
      .map(res => res.json());
  }

  deleteUsuario(id: String) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.delete(this.url + 'usuarios/' + id, options).map(res => res.json());
  }
 
}
