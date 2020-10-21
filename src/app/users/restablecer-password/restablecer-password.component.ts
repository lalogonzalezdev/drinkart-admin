import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AccesoService } from 'src/app/services/acceso.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css'],
  providers: [AccesoService],
})
export class RestablecerPasswordComponent implements OnInit {
  userForm: FormGroup;
  roles;
  loading = false;
  submitted = false;
  error = '';
  user = new User();
  email: string = '';
  token: string = '';
  noExiste = false;
  message;
  tokenValido = false;

  constructor(
    private getRoute: ActivatedRoute,
    private route: Router,
    private apiAcceso: AccesoService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.email = '';
  }

  ngOnInit(): void {
    this.getRoute.paramMap.subscribe((params) => {
      this.token = params.get('token');
      this.email = params.get('email');
      //Confirmar token valido para el usuario
      this.apiAcceso.verificarTokenPorEmail(this.email, this.token).subscribe(
        (data) => {
          if ((data.status = 201)) this.tokenValido = true;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordTwo: ['', Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.noExiste = false;

    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;

    this.apiAcceso.getUsersByEmail(this.email).subscribe(
      (data) => {
        this.user = data[0];
        this.error = '';

        this.user.password = this.f.password.value;

        if (
          this.user.password === this.f.passwordTwo.value &&
          this.user.password !== undefined &&
          this.f.passwordTwo.value !== undefined
        ) {
          this.apiAcceso.updateUser(this.user).subscribe(
            (data) => {
              this.user = data;
              this.authenticationService.logout();

              this.authenticationService
                .login(this.f.email.value, this.f.password.value)
                .subscribe(
                  (data) => {
                    if ((data.status = 201))
                      (this.message =
                        'Se reestableció el password correctamente'),
                        setTimeout(() => {
                          this.route.navigate(['']);
                        }, 6000);
                    else this.noExiste = true;
                  },
                  (errors) => {
                    this.error = errors;
                    this.loading = false;
                  }
                );
            },
            (errors) => {
              console.log(errors);
              this.error = errors;
              this.noExiste = true;
            }
          );
        } else {
          alert('Datos invalidos');
        }
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
