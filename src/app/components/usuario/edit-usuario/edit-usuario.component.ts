import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
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
  selector: 'edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
  providers: [UserService]
})
export class EditUsuarioComponent implements OnInit {
  
  public title: String = 'Edición de datos del usuario';
  public url;
  public usuario:any={};

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    // this.usuario = new User(0,'','');
  }

  ngOnInit() {
    this.gerUsuarioUrl();
    // this.getProveedor();
  }

   public usuarioId:String='';
   gerUsuarioUrl() {
    this._route.params.forEach((params: Params) => {
      if (params['id']) {
        this.usuarioId = params['id'];
        this.getUsuario();
      }
    });
  }

  editUsuario() {
    this._userService.updateUser(this.usuarioId, this.usuario).subscribe(
      response => {
        if (!response.data) {
          swal('Lo sientimos', 'Información no moficada', 'warning');

        } else {
          
          swal(
            "Usuario modificado",
            "El usuario fue modificado correctamente",
            "success"
          );
          this._router.navigate(["/mant-usuario"]);
        }
      },
      error => {

      });
  }

  getUsuario() {
    this._userService.getUser(this.usuarioId).subscribe(
      response => {
        if (!response.data) {
        } else {
          this.usuario.user_name = response.data.user_name;
          console.log(this.usuario);
          //    this.imagenTemp=this.restaurant.imagen;
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          console.log(error);
        }
      }
    );
  }
 
}
