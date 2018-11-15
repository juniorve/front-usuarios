import { User } from './../../../models/user';
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
  selector: 'new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css'],
  providers: [UserService,User_perfilService,User_moduloService]

})
export class NewUsuarioComponent implements OnInit {
  public title: String = 'Registro de nuevo usuario';
  public url;
  public usuario:any={};
  
  public umodulos:any={};
  public usuario_modulo:any={};
  public usuario_perfil:any={};
  public tipos: any[] = [
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Administrativo'},
    {value: 3, viewValue: 'Docente'},
    {value: 4, viewValue: 'Alumno'}
  ];
  
  modulos = new FormControl();
  modulosList: any[] = [
    {value: 1, viewValue: 'Carga de recaudaciones'},
    {value: 2, viewValue: 'Control de recibos'},
    {value: 3, viewValue: 'Estadisticas'},
    {value: 4, viewValue: 'Estado de pagos'},
    {value: 5, viewValue: 'Disponibilidad docente'},
    {value: 6, viewValue: 'Control de tesistas'},
    {value: 7, viewValue: 'Legajo docente'},
    {value: 8, viewValue: 'Administración de usuarios'}
  ];

  modulosL:any={
    mod1:[
      {value: 1, viewValue: 'Carga de recaudaciones'},
      {value: 2, viewValue: 'Control de recibos'},
      {value: 3, viewValue: 'Estadisticas'},
      {value: 4, viewValue: 'Estado de pagos'},
      {value: 5, viewValue: 'Disponibilidad docente'},
      {value: 6, viewValue: 'Control de tesistas'},
      {value: 7, viewValue: 'Legajo docente'},
      {value: 8, viewValue: 'Administración de usuarios'}
    ],
    mod2:[
      {value: 1, viewValue: 'Carga de recaudaciones'},
      {value: 2, viewValue: 'Control de recibos'},
      {value: 3, viewValue: 'Estadisticas'},
      {value: 4, viewValue: 'Estado de pagos'}
    ],
    mod3:[
      {value: 6, viewValue: 'Control de tesistas'},
      {value: 7, viewValue: 'Legajo docente'},
    ],
    mod4:[ 
      {value: 5, viewValue: 'Disponibilidad docente'},
      {value: 7, viewValue: 'Legajo docente'},
    ]
  };
 
  constructor(
    private _userPerfilService:User_perfilService,
    private _userModuloService:User_moduloService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    this.usuario_perfil.id_perfil=0;
  }

  ngOnInit() { 
    this.getUsuarios();
  }

  saveUser(){
    this.usuario.estado='Activo';
    this.usuario.id_usuario=this.usuarios.length+1;
    this._userService.saveUser(this.usuario).subscribe(
      response=>{
        if(!response.data){
          swal('Usuario no registrado','No se puedo guardar usuario','warning');
        }else{
          this.usuario_perfil.id_usuario = response.data.id_usuario;
          this.usuario_perfil.estado_up = true;
          this._userPerfilService.saveUser_perfil(this.usuario_perfil).subscribe(
            response=>{
              if(!response.data){
                console.log("error al guardar usuario_perfil");
              }else{
                swal('Usuario registrado','Usuario guardado exitosamente','success');
                this._router.navigate(['/mant-usuario']);
              }
            },
            error=>{}
          );

          console.log(this.umodulos.id_mod);
          
          for(let modulo of this.umodulos.id_mod){
            this.usuario_modulo.id_usuario=response.data.id_usuario;
            this.usuario_modulo.estado_um=true;
            this.usuario_modulo.id_mod = modulo;
            console.log(this.usuario_modulo);
            this._userModuloService.saveUser_modulo(this.usuario_modulo).subscribe(
            response=>{
              // console.log(response.data)
            },
            error=>{
            }
          );
        }
          
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
