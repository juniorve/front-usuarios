import { User_perfilService } from './../../../services/user_perfil.service';
import { Usuario_perfil } from './../../../models/user_perfil';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { User } from './../../../models/user';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'mant-usuario',
  templateUrl: './mant-usuario.component.html',
  styleUrls: ['./mant-usuario.component.css'],
  providers: [UserService, User_perfilService]
})
export class MantUsuarioComponent implements OnInit {
  public url;
  public _idRestaurant: String;
  public usuarios: User[] = [];
  public usuarios_perfil: Usuario_perfil[] = [];

  constructor(
    private _userService: UserService,
    private _user_perfilService: User_perfilService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getUsuarios();
    this.getUsuario_perfil();
  }

  getUsuarios() {
    this._userService.getUsuarios().subscribe(
      response => {
        if (!response.data) {
          console.log("No hay usuarios");
        } else {
          this.usuarios = response.data;

          console.log(this.usuarios);
        }
      },
      error => {
      }
    );
  }



  getUsuario_perfil() {
    this._user_perfilService.getUsuarios_perfil().subscribe(
      response => {
        if (!response.data) {
          console.log("No hay usuarios");
        } else {
          this.usuarios_perfil = response.data;

          console.log(this.usuarios_perfil);

          for (let i = 0; i < this.usuarios.length; i++) {
            for (let j = 0; j < this.usuarios_perfil.length; j++) {
              if (this.usuarios[i].id_usuario == this.usuarios_perfil[j].id_usuario) {
                if (this.usuarios_perfil[j].id_perfil == 1) {
                  this.usuarios[i].tipo = 'Administrador';
                }
                if (this.usuarios_perfil[j].id_perfil == 2) {
                  this.usuarios[i].tipo = 'Administrativo';
                }
                if (this.usuarios_perfil[j].id_perfil == 3) {
                  this.usuarios[i].tipo = 'Docente';
                }
                if (this.usuarios_perfil[j].id_perfil == 4) {
                  this.usuarios[i].tipo = 'Alumno';
                }

              }
            }
          }

          console.log(this.usuarios);
        }
      },
      error => {
      }
    );
  }

public usuario:any={};
  deleteUsuario(idUsuario: String, usuario:any) {
    this.usuario=usuario;
    this.usuario.estado='Inactivo';
    console.log(this.usuario);
    this._userService.updateUser(idUsuario, this.usuario).subscribe(
      response => {
        if (!response.data) {
          swal('Lo sientimos', 'Usuario no eliminado', 'warning');

        } else {
          swal(
            "Usuario eliminado",
            "El usuario fue eliminado correctamente",
            "success"
          ); 
          // this.getUsuarios();
          // this.getUsuario_perfil();
        }
      },
      error => {

      });
  }

  editUsuario(idUsuario: String) {
    this._router.navigate(['/edit-usuario/' + idUsuario]);
  }

}
