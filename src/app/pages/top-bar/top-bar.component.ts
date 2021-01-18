import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CarritoService } from 'src/app/services/carrito.service';
import { PagesService } from 'src/app/services/pages.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  currentUser: User;
  isCollapsed = true;
  DJANGO_SERVER = `${environment.apiUrl}`;
  loading = false;
  error = '';
  message;
  productosCarrito: any[];
  total: number = 0;
  estados: any = [];
  codigoPostal: string = "";
  muestraCombo: boolean = false;
  muestraInputs: boolean = false;
  codigoNovalido: boolean = false;
  domicilio = {};
  calle: string = "";
  numero: string = "";
  referencia: string = "";
  direccionForm: FormGroup;
  allCategorias: any[];
  screenWidth: number;
  submitted = false;
  metodoPago = true;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCarrito: CarritoService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.screenWidth = window.innerWidth; 
  }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(){
    this.direccionForm = this.formBuilder.group({
      codigo:[''],
      asentamiento:['Seleccione un asentamiento', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      referencia: ['']
    });
  }

  onResize(event){
    this.screenWidth = window.innerWidth;
  }

  get f() { return this.direccionForm.controls; }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  CloseClickOutside() {
    if (document.getElementById('sideBarCart').style.width != "" 
        && document.getElementById('sideBarCart').style.width != "0px" )
      this.closeNav();
  }

  getProductosCarrito = () => {
    this.apiCarrito.getProductosCarrito(this.currentUser.id).subscribe(
      data => {
        this.productosCarrito = data;
        this.total = 0;
        this.productosCarrito.forEach(prod => {
          this.total += parseFloat(prod.producto.precio) * parseFloat(prod.cantidad);
        });
      },
      error => { console.log(error); }
    );
  }

  cleanError() {
    this.message = "";
  }

  finalizarVenta() {
    this.calle = this.f.calle.value;
    this.numero = this.f.numero.value;
    this.referencia = this.f.referencia.value;
    this.closeNav();
    this.apiCarrito.endVenta(this.currentUser.id, this.total, this.f.asentamiento.value, this.calle, this.numero, this.referencia).subscribe(
      (data) => {
        this.getProductosCarrito();
        this.muestraCombo = false;
        this.muestraInputs = false;
      },
      (error) => {
        console.log(error);
      }
    );
    this.message = "Se finalizó la compra correctamente, gracias por comprar por nosotros!";
    setTimeout(() => {
      this.cleanError();
      this.modalService.dismissAll();
      this.router.navigate(['/mis-compras']);
    }, 6000);
  }

  pagar() {
    this.calle = this.f.calle.value;
    this.numero = this.f.numero.value;
    this.referencia = this.f.referencia.value;
    this.closeNav();
    this.apiCarrito.pagarVenta(this.currentUser.id, this.total, this.f.asentamiento.value, this.calle, this.numero, this.referencia).subscribe(
      (data) => {
        window.open(this.DJANGO_SERVER+'/carrito/pagar_venta/' + data.idVenta, "_self");
      },
      (error) => {
        console.log(error);
      }
    );
  }


  removeItemCart(prC) {
    this.apiCarrito.removeItemCart(this.currentUser.id, prC.producto.id).subscribe(
      (data) => {
        this.getProductosCarrito();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  aumentarItemCart(prC) {
    this.apiCarrito.addItemCart(this.currentUser.id, prC.producto.id, prC.cantidad).subscribe(
      (data) => {
        this.getProductosCarrito();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  decrementarItemCart(prC) {
    this.apiCarrito.quitItemCart(this.currentUser.id, prC.producto.id, prC.cantidad).subscribe(
      (data) => {
        this.getProductosCarrito();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeNav() {
    document.getElementById('sideBarCart').style.width = "0px";
  }

  openNav() {
    this.muestraCombo = false;
    this.muestraInputs = false;
    this.resetForm();
    //this.isCollapsed = !this.isCollapsed
    if (this.screenWidth > 450)
      document.getElementById('sideBarCart').style.width = "450px";
    else{
      let smallCarWidth = this.screenWidth - 20; 
      document.getElementById('sideBarCart').style.width = smallCarWidth.toString() + "px";
    } 
      
    this.getProductosCarrito();
  }

  getActivity = (modal) => {
    this.closeNav();
    this.getProductosCarrito();
    this.modalService.open(modal, { scrollable: true });
  }

  getDireccion = () => {
    this.codigoPostal = this.f.codigo.value;
    this.estados = [];
    try {
      this.apiCarrito.getDireccionList(this.codigoPostal).subscribe(
        data => {
          data.forEach(estado => {
            this.estados.unshift({
                asentamiento: estado.response.asentamiento,
                cp: estado.response.cp,
                municipio: estado.response.municipio,
                estado: estado.response.estado,
                ciudad: estado.response.ciudad,
                pais: estado.response.pais
              });
              this.muestraCombo = true;
              this.codigoNovalido = false;
          });
        },
        error => { 
          console.log(error);
          this.muestraCombo = false;
          this.muestraInputs = false;
          this.codigoNovalido = true;
        }
      );
    } catch (error) {
      console.log(error);
    }
    
  }

  pintaDomicilio(){
    this.muestraInputs = this.f.asentamiento.value != "Seleccione un asentamiento";
  }

  categorias() {
    this.apiCarrito.getCategorias().subscribe(
      (data) => {
        this.allCategorias = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  validateForm() {
    this.submitted = true;
    if (this.direccionForm.invalid) {
      return;
    }
    this.metodoPago = false;
  }

  cambioDomicilio() {
    this.metodoPago = true;
  }

}
