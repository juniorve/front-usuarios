import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { RouterModule ,Routes } from "@angular/router";
import { NewUsuarioComponent } from './new-usuario/new-usuario.component';
import { MantUsuarioComponent } from './mant-usuario/mant-usuario.component';


const usuarioRoutes:Routes = [
    {path:'edit-usuario/:id', component: EditUsuarioComponent},
    {path:'mant-usuario', component: MantUsuarioComponent},
    {path:'new-usuario', component: NewUsuarioComponent}
]

export const USUARIO_ROUTES = RouterModule.forChild(usuarioRoutes);