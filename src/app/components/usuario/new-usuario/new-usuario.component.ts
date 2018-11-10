import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css'],
  providers: [UserService]

})
export class NewUsuarioComponent implements OnInit {
  public title: String = 'Registro de nuevo usuario';
  public url;
  public usuario:any={};
  
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit() { }

  saveUser(){
    this.usuario.estado='Activo';
    this._userService.saveUser(this.usuario).subscribe(
      response=>{
        if(!response.data){
          swal('Usuario no registrado','No se puedo guardar usuario','warning');
        }else{
          swal('Usuario registrado','Usuario guardado exitosamente','success');
          this._router.navigate(['/mant-usuario']);
          console.log(response.data);
        }
      },
      erro=>{

      }
    );
  }

}
