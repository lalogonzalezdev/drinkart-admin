import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule} from '@angular/material/card';
import { MatRadioModule} from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BasicAuthInterceptor } from './services/basic-auth-interceptor.service';

import { TopBarComponent } from './pages/top-bar/top-bar.component';



import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { OutRegisterComponent } from './users/out-register/out-register.component';
import { EmailPorConfirmarComponent } from './users/email-por-confirmar/email-por-confirmar.component';
import { RestablecerPasswordComponent } from './users/restablecer-password/restablecer-password.component';
import { PasswordPorRestablecerComponent } from './users/password-por-restablecer/password-por-restablecer.component';
import { LoginComponent } from './users/login/login.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ControlVentasComponent } from './pages/control-ventas/control-ventas.component';
import { ControlEventosComponent } from './pages/control-eventos/control-eventos.component';
import { ControlPropuestasArtisticasComponent } from './pages/control-propuestas-artisticas/control-propuestas-artisticas.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    UserListComponent,
    UserEditComponent,
    UserRegisterComponent,
    OutRegisterComponent,
    EmailPorConfirmarComponent,
    RestablecerPasswordComponent,
    PasswordPorRestablecerComponent,
    ControlVentasComponent,
    ControlEventosComponent,
    ControlPropuestasArtisticasComponent,
    CotizacionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ImageCropperModule,
    MatCardModule,
    MatRadioModule,
    NgbModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
