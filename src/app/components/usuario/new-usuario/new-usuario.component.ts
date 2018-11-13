import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { User_perfilService } from 'src/app/services/user_perfil.service';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css'],
  providers: [UserService,User_perfilService]

})
export class NewUsuarioComponent implements OnInit {
  public title: String = 'Registro de nuevo usuario';
  public url;
  public usuario:any={};
  public usuario_perfil:any={};
  public tipos: any[] = [
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Administrativo'},
    {value: 3, viewValue: 'Docente'},
    {value: 4, viewValue: 'Alumno'}
  ];

  
  modulos = new FormControl();
  modulosList: string[] = ['Carga de recaudaciones',
   'Control de recibos', 'Estadisticas', 'Estado de pagos', 'Disponibilidad docente', 
   'Control de tesistas', 'Legajo docente', 'Administración de usuarios'];
  
  constructor(
    private _userPerfilService:User_perfilService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit() { 
    this.getUsuarios();
  }

  saveUser(){
    this.usuario.estado='Activo';
    this.usuario.id_usuario=this.usuarios.length+1;
    console.log(this.usuario);
    this._userService.saveUser(this.usuario).subscribe(
      response=>{
        if(!response.data){
          swal('Usuario no registrado','No se puedo guardar usuario','warning');
        }else{
          this.usuario_perfil.id_usuario = response.data.id_usuario;
          this.usuario_perfil.estado_up = true;
          console.log(this.usuario_perfil);
          this._userPerfilService.saveUser_perfil(this.usuario_perfil).subscribe(
            response=>{
              if(!response.data){
                console.log("error al guardar usuario_perfil");
              }else{
                console.log(response.data);
                swal('Usuario registrado','Usuario guardado exitosamente','success');
                this._router.navigate(['/mant-usuario']);
              }
            },
            error=>{

            }
          );
          
        }
      },
      erro=>{

      }
    );
  }

  public usuarios:any[]=[];
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


}
