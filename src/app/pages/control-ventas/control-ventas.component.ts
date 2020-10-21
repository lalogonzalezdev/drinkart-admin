import { Component, OnInit } from '@angular/core';
import { CarritoService} from 'src/app/services/carrito.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-control-ventas',
  templateUrl: './control-ventas.component.html',
  styleUrls: ['./control-ventas.component.css']
})
export class ControlVentasComponent implements OnInit {
  title = 'drinkart-app';
  list;
  updateVenta:any;
  productosVenta: any = [];
  listaVentas: any = [];
  currentUser: User;
  filterForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  submittedUp = false;
  submittedAd = false;
  p = 1;
  message;
  

  constructor(
    private apiCarrito: CarritoService,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private formBuilderUpdate: FormBuilder,
    private modalService: NgbModal
    ){
    //this.updateActivity = {proyectoUp: '', actividadUp: '', finalizadaUp: ''};
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      email: [''],
      fecha_registro: [''],
      venta_finalizada: [true],
      pagado: [false],
      entregado: [false],
    });
    this.getDataForm();
    this.updateForm = this.formBuilderUpdate.group({
      pagado: [''],
      entregado: ['']
    });

  }

  get f() { return this.filterForm.controls; }

  get g() { return this.updateForm.controls; }


  getDataForm(){
    let usuario = localStorage.getItem('user');
    usuario = JSON.parse(usuario);
    this.submitted = true;
    //this.selectedActivity.proyecto = this.f.proyecto.value;
    if (this.filterForm.invalid) {
      return;
    }
    this.apiCarrito.getListaVentas(
      this.f.email.value,
      this.f.fecha_registro.value, 
      this.f.venta_finalizada.value, 
      this.f.pagado.value, 
      this.f.entregado.value, 
      ).subscribe(
      data => { this.listaVentas = data; 
        console.log(data);},
      error => {console.log(error); }
    );
  }



  // getList = () => {
  //   this.apiCarrito.getAllDoneList().subscribe(
  //     data => { this.list = data; },
  //     error => {console.log(error); }
  //   );
  // }

  getActivity = (idVenta, modal) => {
    this.getVentaPorId(idVenta, modal);
  }

  // createActivity = (modal) => {
  //   this.modalService.open(modal);
  // }

  // actSelected = (list) => {
  //   console.log(list.id);

  //   this.apiCarrito.getOneFromList(list.id).subscribe(
  //     data => {
  //       console.log(data);
  //       this.selectedActivity = list;
  //     },
  //     error => {console.log(error); }
  //   );
  // }

  updateListaVenta = () => {
    this.submittedUp = true;
    
    this.updateVenta.pagado = this.g.pagado.value;
    this.updateVenta.entregado = this.g.entregado.value;
    if (this.updateForm.invalid) {
      return;
    }
    console.log(this.updateVenta);
    this.apiCarrito.updateListaVentas(this.updateVenta).subscribe(
      data => {
        console.log(data);
        this.getDataForm();
      },
      error => {console.log(error); }
    );
    this.modalService.dismissAll();
    this.message = "Se modificó la venta correctamente";
    setTimeout(() => {
      this.cleanError()
    }, 6000);
  }

  getProductosDeVenta(){
    this.apiCarrito.getProductosPorVenta(
      this.updateVenta.id
      ).subscribe(
      data => { this.productosVenta = data; 
        console.log(data);},
      error => {console.log(error); }
    );
  }

  getVentaPorId(id, modal){
    this.apiCarrito.getListaVentasPk(id).subscribe(
      data => { 
        this.updateVenta = data; 
        console.log(this.updateVenta);
        this.getProductosDeVenta();
        this.modalService.open(modal, { scrollable: true });
        console.log(data);},
      error => {console.log(error); }
    );
  }


  deleteVenta = () => {
    console.log(this.updateVenta);
    this.apiCarrito.deleteListaVentas(this.updateVenta.id).subscribe(
      data => {
        this.getDataForm();
      },
      error => {console.log(error); }
    );
    this.modalService.dismissAll();
    this.message = "Se eliminó la venta";
    setTimeout(() => {
      this.cleanError()
    }, 6000);
  }

  resetForm(){
    this.filterForm = this.formBuilder.group({
      email: [''],
      fecha_registro: [''],
      venta_finalizada: [true],
      pagado: [false],
      entregado: [false],
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

