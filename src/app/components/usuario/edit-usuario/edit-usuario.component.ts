import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { User_perfilService } from 'src/app/services/user_perfil.service';
import { User_moduloService } from 'src/app/services/user_modulo';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
  providers: [UserService, User_perfilService, User_moduloService]
})
export class EditUsuarioComponent implements OnInit {

  public title: String = 'Edición de datos del usuario';
  public url;
  public usuario: any = {};

  public umodulos: any = { id_mod: [] };
  public usuario_modulo: any = {};
  public usuario_perfil: any = {};
  public tipos: any[] = [
    { value: 1, viewValue: 'Administrador' },
    { value: 2, viewValue: 'Administrativo' },
    { value: 3, viewValue: 'Docente' },
    { value: 4, viewValue: 'Alumno' }
  ];
  modulos = new FormControl();
  modulosL: any = {
    mod1: [
      { value: 1, viewValue: 'Carga de recaudaciones' },
      { value: 2, viewValue: 'Control de recibos' },
      { value: 3, viewValue: 'Estadisticas' },
      { value: 4, viewValue: 'Estado de pagos' },
      { value: 5, viewValue: 'Disponibilidad docente' },
      { value: 6, viewValue: 'Control de tesistas' },
      { value: 7, viewValue: 'Legajo docente' },
      { value: 8, viewValue: 'Administración de usuarios' }
    ],
    mod2: [
      { value: 1, viewValue: 'Carga de recaudaciones' },
      { value: 2, viewValue: 'Control de recibos' },
      { value: 3, viewValue: 'Estadisticas' },
      { value: 4, viewValue: 'Estado de pagos' }
    ],
    mod3: [
      { value: 6, viewValue: 'Control de tesistas' },
      { value: 7, viewValue: 'Legajo docente' },
    ],
    mod4: [
      { value: 5, viewValue: 'Disponibilidad docente' },
      { value: 7, viewValue: 'Legajo docente' },
    ]
  };
  constructor(
    private _userPerfilService: User_perfilService,
    private _userModuloService: User_moduloService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    // this.usuario = new User(0,'','');
    this.usuario_perfil.id_perfil = 0;
  }

  ngOnInit() {
    this.gerUsuarioUrl();
    this.getUsuarioPerfil();
    // this.getUsuario_modulo();
  }

  public usuarioId: String = '';
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
          this.usuario_perfil.id_usuario = this.usuarioId;
          this.usuario_perfil.estado_up = true;
          this._userPerfilService.updateUser_perfil(this.usuarioId, this.usuario_perfil).subscribe(
            response => {
              if (!response.data) {
                console.log("error al modificar usuario_perfil")
              } else {
                console.log(response.data);
                swal("Usuario modificado", "El usuario fue modificado correctamente", "success");
                this._router.navigate(["/mant-usuario"]);
              }
            },
            error => {

            }
          );

          for (let i = 0; i < this.umodulos.id_mod.length; i++) {
            this.usuario_modulo.id_usuario = response.data.id_usuario;
            this.usuario_modulo.estado_um = true;
            this.usuario_modulo.id_mod = this.umodulos.id_mod[i];
            if (i == 0) {
              this.usuario_modulo.band = true;
              this._userModuloService.updateUser_modulo(this.usuarioId, this.usuario_modulo).subscribe(
                response => {
                  console.log(response.data)
                },
                error => {
                }
              );
            } else {
              this.usuario_modulo.band = false;
              this._userModuloService.updateUser_modulo(this.usuarioId, this.usuario_modulo).subscribe(
                response => {
                  console.log(response.data)
                },
                error => {
                }
              );
            }
          }


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


  getUsuario_modulo() {
    this._userModuloService.getUsuarios_modulo(this.usuarioId).subscribe(
      response => {
        if (!response.data) {
        } else {
          console.log(response.data.length);

          for (let i = 0; i < response.data.length; i++) {
            this.umodulos.id_mod[i] = response.data[i].id_mod;
          }
          console.log(this.umodulos.id_mod);

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

  public tipo: any = "";
  getUsuarioPerfil() {
    this._userPerfilService.getUsuarios_perfil(this.usuarioId).subscribe(
      response => {
        if (!response.data) {
        } else {
          this.usuario_perfil.id_perfil = response.data.id_perfil;
          console.log(response.data);
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
