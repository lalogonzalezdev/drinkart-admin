import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

/**
 * Páginas para el usuario
 */



import { ControlVentasComponent } from './pages/control-ventas/control-ventas.component';
import { ControlEventosComponent } from './pages/control-eventos/control-eventos.component';
import { ControlPropuestasArtisticasComponent } from './pages/control-propuestas-artisticas/control-propuestas-artisticas.component';

/**
 * Manejo de usuarios
 */
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { OutRegisterComponent } from './users/out-register/out-register.component';
import { EmailPorConfirmarComponent } from './users/email-por-confirmar/email-por-confirmar.component';
import { RestablecerPasswordComponent } from './users/restablecer-password/restablecer-password.component';
import { PasswordPorRestablecerComponent } from './users/password-por-restablecer/password-por-restablecer.component';
import { LoginComponent } from './users/login/login.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ControlVentasComponent, canActivate: [AuthGuard]},
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'control-ventas', component: ControlVentasComponent, canActivate: [AuthGuard] },
  { path: 'control-eventos', component: ControlEventosComponent, canActivate: [AuthGuard] },
  { path: 'control-propuestas-artisticas', component: ControlPropuestasArtisticasComponent,  canActivate: [AuthGuard] },
  { path: 'user-register', component: UserRegisterComponent, canActivate: [AuthGuard] },
  { path: 'out-register/ec50a102923aae8393370e43fd615b/:email', component: OutRegisterComponent },
  { path: 'email-por-confirmar', component: EmailPorConfirmarComponent },
  { path: 'password-por-reestablecer', component: PasswordPorRestablecerComponent },
  { path: 'reestablecer_password/:token/:email', component: RestablecerPasswordComponent },
  { path: 'cotizaciones', component: CotizacionesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
