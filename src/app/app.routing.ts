import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';
import { MantUsuarioComponent } from './components/usuario/mant-usuario/mant-usuario.component';
import { NewUsuarioComponent } from './components/usuario/new-usuario/new-usuario.component';

const appRoutes: Routes = [
  {path:'edit-usuario/:id', component: EditUsuarioComponent},
  {path:'mant-usuario', component: MantUsuarioComponent},
  {path:'new-usuario', component: NewUsuarioComponent},
  { path: '', redirectTo: '/mant-usuario', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

