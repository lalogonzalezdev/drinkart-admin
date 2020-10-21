import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from 'src/app/services/acceso.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-email-por-confirmar',
  templateUrl: './email-por-confirmar.component.html',
  styleUrls: ['./email-por-confirmar.component.css'],
  providers: [AccesoService],
})
export class EmailPorConfirmarComponent implements OnInit {
  emailForm: FormGroup;
  loading = false;
  submitted = false;
  titulo = 'Artista para crear tu cuenta captura tu dirección de correo.';
  message;

  constructor(
    private formBuilder: FormBuilder,
    private apiAcceso: AccesoService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.emailForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }
    this.apiAcceso.sendEmailPorConfirmar(this.f.email.value).subscribe(
      (data) => {
        this.message = '  Te enviamos un correo para finalizar tu registro.';
        setTimeout(() => {
          this.authenticationService.logout();//Cerrar sesion en caso de que exista alguna cuenta registrada.
          this.router.navigate(['']);
        }, 10000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cleanError() {
    this.message = '';
  }
}
