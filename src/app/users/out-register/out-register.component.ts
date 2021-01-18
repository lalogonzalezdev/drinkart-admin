import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AccesoService } from 'src/app/services/acceso.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-out-register',
  templateUrl: './out-register.component.html',
  styleUrls: ['./out-register.component.css'],
  providers: [AuthenticationService]
})
export class OutRegisterComponent implements OnInit {
  currentUser: User;
  userForm: FormGroup;
  roles;
  loading = false;
  submitted = false;
  error = '';
  errorPassword = ''
  user = new User();
  email = '';
  yaExiste = false;
  message;
  mascaraTelefono = "^[0-9]{10}$";



  constructor(
    private getRoute: ActivatedRoute,
    private route: Router,
    private apiAcceso: AccesoService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    //Si ya finalizó el registro 
    if (this.currentUser){
      this.route.navigate([''])
    }
    else
    {
      this.getRoute.paramMap.subscribe(params => {
        this.email = params.get('email');
      });
      this.userForm = this.formBuilder.group({
        email: ['', Validators.required],
        telefono: ['', Validators.required],
        password: ['', Validators.required],
        passwordTwo: ['', Validators.required]
      });
    }
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.yaExiste  = false;
    this.errorPassword  = '';

    if (this.userForm.invalid) {
      return;
    }

    this.user.email = this.f.email.value;
    this.user.telefono = this.f.telefono.value;
    this.user.password = this.f.password.value;
    this.user.rol = 99;


    if ((
      this.user.password === this.f.passwordTwo.value) &&
      this.user.password !== undefined &&
      this.f.passwordTwo.value !== undefined)
    {
      this.loading = true;
      this.apiAcceso.registerUser(this.user).subscribe(
        data => {
          this.user = data;
          this.authenticationService.logout();

          this.authenticationService.login(this.f.email.value, this.f.password.value)
          .subscribe(
              data => {
                if (data.status = 201){
                  this.message = "Bienvenido artista, puedes seguir con tus compras de forma segura.";
                  setTimeout(() => {
                    window.location.reload();
                  }, 6000)
                }
                else
                  this.yaExiste = true;
              },
              errors => {
                  this.error = errors;
                  this.loading = false;
              });
        },
        errors => {
          console.log(errors);
          this.error = errors;
          this.yaExiste = true;
        }
      );

    }
    else{
      this.errorPassword = 'La contraseña no coincide';
    }
  }

  cleanError(){
    this.message = "";
  }
}
