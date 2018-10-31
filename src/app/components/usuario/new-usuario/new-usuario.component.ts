import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../../../models/proveedor';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
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
  providers: []

})
export class NewUsuarioComponent implements OnInit {
  public title: String = 'Registro de nuevo proveedor';
  public url;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit() { }


}
