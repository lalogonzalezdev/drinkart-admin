import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarritoService } from 'src/app/services/carrito.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-control-eventos',
  templateUrl: './control-eventos.component.html',
  styleUrls: ['./control-eventos.component.css']
})
export class ControlEventosComponent implements OnInit {
  title = 'drinkart-app';
  list;
  updateReservacion:any;
  lista: any = [];
  nombresEventos : any =[];
  currentUser: User;
  filterForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  submittedUp = false;
  p = 1;
  message;
  

  constructor(
    private apiCarrito: CarritoService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private formBuilderUpdate: FormBuilder,
    private modalService: NgbModal
    ){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.resetForm();
    this.updateForm = this.formBuilderUpdate.group({
      updateReservacionPagado: [''],
    });
    this.getDataForm();
  }

  get f() { return this.filterForm.controls; }

  get g() { return this.updateForm.controls; }


  getDataForm(){
    let usuario = localStorage.getItem('user');
    usuario = JSON.parse(usuario);
    this.submitted = true;
    if (this.filterForm.invalid) {
      return;
    }
    
    this.apiCarrito.getListaReservaciones(
      this.f.email.value,
      this.f.fecha_evento.value, 
      this.f.pagado.value,
      this.f.nombre.value,
      ).subscribe(
      data => { 
        this.lista = data; 
        for (let reservacion of this.lista){
          if (!this.nombresEventos.includes(reservacion.evento.nombre))
            this.nombresEventos.push(reservacion.evento.nombre);
        }
      },
      error => {console.log(error); }
    );
  }

  getActivity = (idVenta, modal) => {
    this.getReservacionPorId(idVenta, modal);
  }

  updateListaVenta = () => {
    this.submittedUp = true;
    
    this.updateReservacion.pagado = this.g.updateReservacionPagado.value;
    if (this.updateForm.invalid) {
      return;
    }
    this.apiCarrito.updateReservacionPorLista(this.updateReservacion).subscribe(
      data => {
        this.getDataForm();
      },
      error => {console.log(error); }
    );
    this.modalService.dismissAll();
    this.message = "Se modificó la reservación correctamente correctamente";
    setTimeout(() => {
      this.cleanError()
    }, 6000);
  }


  getReservacionPorId(id, modal){
    this.apiCarrito.getReservacionPorPk(id).subscribe(
      data => { 
        this.updateReservacion = data; 
        this.updateForm.patchValue({updateReservacionPagado: this.updateReservacion.pagado});
        this.modalService.open(modal, { scrollable: true });
        },
      error => {console.log(error); }
    );
  }


  deleteVenta = () => {
    this.apiCarrito.deleteReservacionPorLista(this.updateReservacion.id).subscribe(
      data => {
        this.getDataForm();
      },
      error => {console.log(error); }
    );
    this.modalService.dismissAll();
    this.message = "Se eliminó la reservación";
    setTimeout(() => {
      this.cleanError()
    }, 6000);
  }

  resetForm(){
    this.filterForm = this.formBuilder.group({
      email: [''],
      fecha_evento: [''],
      nombre: ['Todos'],
      pagado: [false],
    });
  }

  resetUpdateForm(){
    this.updateForm.reset();
  }

  cleanError(){
    this.message = "";
  }

  closeModal(modal){
    this.modalService.dismissAll();
  }

}

