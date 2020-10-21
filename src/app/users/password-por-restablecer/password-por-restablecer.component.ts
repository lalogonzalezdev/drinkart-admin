import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from 'src/app/services/acceso.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-por-restablecer',
  templateUrl: './password-por-restablecer.component.html',
  styleUrls: ['./password-por-restablecer.component.css'],
  providers: [AccesoService]
})
export class PasswordPorRestablecerComponent implements OnInit {
  emailForm: FormGroup;
  loading = false;
  submitted = false;
  titulo = 'Artista captura tu email y enviaremos el enlace para actualizar tu contraseña.';
  message;

  constructor(
    private formBuilder: FormBuilder,
    private apiAcceso: AccesoService,
    private router: Router
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
    this.apiAcceso.sendEmailParaReestablecerPassword(this.f.email.value).subscribe(
      (data) => {
        this.message = 'Se mandó el enlace a la cuenta solicitada.';
        setTimeout(() => {
          this.router.navigate(['']);
        }, 6000);
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
