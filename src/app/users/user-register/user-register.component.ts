import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Catalogo } from 'src/app/models/catalogo';
import { AccesoService } from 'src/app/services/acceso.service';

@Component({
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers: [AccesoService]
})
export class UserRegisterComponent implements OnInit {
  userForm: FormGroup;
  roles;
  loading = false;
  submitted = false;
  error = '';
  user = new User();
  message;
  mascaraTelefono = "^[0-9]{10}$";

  constructor(
    private route: Router,
    private apiAcceso: AccesoService,
    private formBuilder: FormBuilder,
    )
  {
  }

  ngOnInit(): void {
    this.getRoles();
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      passwordTwo: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  getRoles = () => {
    this.apiAcceso.getRolesList().subscribe(
      data => { this.roles = data;
      this.roles.unshift({
        id: '',
        texto: 'Seleccione un rol'
      })},
      error => {console.log(error); }
    );
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    this.user.email = this.f.email.value;
    this.user.telefono = this.f.telefono.value;
    this.user.password = this.f.password.value;
    this.user.rol = this.f.rol.value;

    if ((
      this.user.password === this.f.passwordTwo.value) &&
      this.user.password !== undefined &&
      this.f.passwordTwo.value !== undefined)
    {
      this.loading = true;
      this.apiAcceso.registerUser(this.user).subscribe(
        data => {
          this.user = data;
          this.message = "Su agregó el usuario correctamente!";
          setTimeout(() => {
            this.route.navigate(['/user-list']);
          }, 3000);
        },
        error => {
          console.log(error);
          this.error = error;
        }
      );
    }
    else{
      alert('Datos invalidos');
    }
  }

  cleanError(){
    this.message = "";
  }

}
