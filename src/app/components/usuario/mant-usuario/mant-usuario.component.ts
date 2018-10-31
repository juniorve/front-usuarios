import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { User } from 'src/app/models/user';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'mant-usuario',
  templateUrl: './mant-usuario.component.html',
  styleUrls: ['./mant-usuario.component.css'],
  providers: [UserService]

})
export class MantUsuarioComponent implements OnInit {
  public url;
  public _idRestaurant: String;
  public usuarios: User[] = [];

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this._userService.getUsuarios().subscribe(
      response=>{
        if(!response.data){
          console.log("No hay usuarios");
        }else{
          this.usuarios=response.data;
          console.log(this.usuarios);
        }
      },
      error=>{

      }
    );
  }

  
  deleteUsuario(idUsuario: String) {
    console.log(idUsuario);
    this._userService.deleteUsuario(idUsuario).subscribe(
      response => {
        if (!response.data) {
          swal('Lo sientimos','El usuario no pudo ser eliminado','warning');

        } else {
          swal('Usuario eliminado','Información del usuario eliminada exitosamente','success');
          this.getUsuarios();
        }

      },
      error => {

      }
    );
  }

  editUsuario(idUsuario: String) {
    this._router.navigate(['/edit-usuario/' + idUsuario]);
  }

}
