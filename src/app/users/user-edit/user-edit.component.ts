import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AccesoService } from 'src/app/services/acceso.service';

@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [AccesoService]
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  roles;
  loading = false;
  submitted = false;
  error = '';
  id;
  user;
  message;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiAcceso: AccesoService,
    private formBuilder: FormBuilder,
    )
  { 
    this.user = {id: '', email: '', password: '', rol: false, token:''};
   }

  ngOnInit(): void {
    this.getRoles();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getUserFromPk(this.id);

    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
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
  getUserFromPk = (id) => {
    this.apiAcceso.getUserByPk(id).subscribe(
      data => { this.user = data;
      console.log(this.user); },
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
    this.user.password = this.f.password.value;
    this.user.rol = this.f.rol.value;

    console.log(this.user);
    if ((this.user.password === this.f.passwordTwo.value) &&
        this.user.password !== undefined &&
        this.f.passwordTwo.value !== undefined)
    {
      this.loading = true;
      this.apiAcceso.updateUser(this.user).subscribe(
        data => {
          this.user = data;
          this.message = "Su editó el usuario correctamente!";
          setTimeout(() => {
            this.router.navigate(['/user-list']);
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



