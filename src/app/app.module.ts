import { UsuarioModule } from './components/usuario/usuario.module';
import { MaterialModule } from './shared/modules/material.module';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';
import { MantUsuarioComponent } from './components/usuario/mant-usuario/mant-usuario.component';
import { NewUsuarioComponent } from './components/usuario/new-usuario/new-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    EditUsuarioComponent,
    MantUsuarioComponent,
    NewUsuarioComponent
  ],
  imports: [
    MaterialModule, 
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    // BrowserModule,
    routing,
    OverlayModule, ReactiveFormsModule
    ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
