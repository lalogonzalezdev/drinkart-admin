import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { PagesService } from 'src/app/services/pages.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-propuesta-artistica',
  templateUrl: './propuesta-artistica.component.html',
  styleUrls: ['./propuesta-artistica.component.css'],
})
export class PropuestaArtisticaComponent implements OnInit, OnDestroy  {
  comentForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  currentUser: User;
  message;
  disabled = true;
  cuentaRegresiva = 0;
  cuentaLimite = 10;
  t;

  
  ctrl = new FormControl(null, Validators.required);

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCarrito: CarritoService,
    private apiPages: PagesService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {

    this.comentForm = this.formBuilder.group({
      imagen: [''],
      profesion: ['', Validators.required],
      historia: ['', Validators.required],
      facebook: [''],
      instagram: [''],
    });
  }



  get f() { return this.comentForm.controls; }

  cleanError(){
    clearTimeout(this.t);
    this.cuentaRegresiva = 0;
    this.router.navigate([''])
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      this.disabled = false;
      const file = event.target.files[0];
      this.comentForm.get('imagen').setValue(file);
    } else {
      this.disabled = true;
    }
  }


  onSubmit() {
    this.submitted = true;

    if (this.comentForm.invalid) {
      return;
    }

      this.loading = true;
      this.apiPages.agregarPropuestaArtistica(
        this.comentForm,
         this.currentUser.id).subscribe(
        data => {
          //Redirigir a portafolio
          this.message = "Su propuesta se agregó correctamente!";
          this.startTime();
          this.submitted = false;
          this.comentForm.reset();
        },
        error => {
          console.log(error);
          this.error = error;
        }
      );
  }

  startTime() {
    this.cuentaRegresiva++;
    this.t = setTimeout(()=>{ this.startTime() }, 1000);
    if (this.cuentaRegresiva === 10){
      clearTimeout(this.t);
      this.cuentaRegresiva = 0;
      this.router.navigate([''])
    }
  }
  
  ngOnDestroy(){
    if (this.t != undefined)
      clearTimeout(this.t);
  }

}
