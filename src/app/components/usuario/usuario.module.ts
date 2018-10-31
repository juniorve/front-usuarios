import { MantUsuarioComponent } from './mant-usuario/mant-usuario.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { MaterialModule } from '../../shared/modules/material.module';
import { HttpModule } from '@angular/http';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { NewUsuarioComponent } from './new-usuario/new-usuario.component';
import { USUARIO_ROUTES } from './usuario.routes';



@NgModule({
    declarations:[
        EditUsuarioComponent,
        MantUsuarioComponent,
        NewUsuarioComponent
    ],
    exports:[
        EditUsuarioComponent,
        MantUsuarioComponent,
        NewUsuarioComponent
    ],
    imports:[
    MaterialModule, 
    FormsModule,
    // CommonModule,
    // HttpModule,
    ReactiveFormsModule,
    USUARIO_ROUTES
    ]
})

export class UsuarioModule { }