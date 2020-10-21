import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models';
import { CarritoService } from 'src/app/services/carrito.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { PagesService } from 'src/app/services/pages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-control-propuestas-artisticas',
  templateUrl: './control-propuestas-artisticas.component.html',
  styleUrls: ['./control-propuestas-artisticas.component.css']
})
export class ControlPropuestasArtisticasComponent implements OnInit {
  title = 'drinkart-app';
  DJANGO_SERVER = `${environment.apiUrl}`;
  list;
  listaActivasUno:any = [];
  listaActivasDos:any = [];
  listaActivasTres:any = [];
  updatePropuesta:any;
  lista: any = [];
  currentUser: User;
  p = 1;
  message;
  submitted = false;
  

  constructor(
    private apiPages: PagesService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
    ){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getDataForm();
  }

  ngOnInit(): void {

  }


  getDataForm(){
    this.submitted = true;
    this.apiPages.getListaPropuestas().subscribe(
      data => { this.lista = data; 
                console.log(data);
                this.llenarListaImagenesActivas(this.lista)},
      error => {console.log(error); }
    );
  }

  getActivity = (idVenta, modal) => {
    this.getPropuestaPorId(idVenta, modal);
  }


  getPropuestaPorId(id, modal){
    this.apiPages.getPropuestaPorPk(id).subscribe(
      data => { 
        this.updatePropuesta = data; 
        console.log(this.updatePropuesta);
        this.modalService.open(modal, { scrollable: true });
        console.log(data);},
      error => {console.log(error); }
    );
  }

  activarPropuesta(id, activo){
    this.apiPages.updatePropuestaPorLista(id, activo).subscribe(
      data => {
        this.getDataForm();
      },
      error => {console.log(error); }
    );
  }

  deletePropuesta = () => {
    console.log(this.updatePropuesta);
    this.apiPages.deletePropuestaPorLista(this.updatePropuesta.id).subscribe(
      data => {
        this.getDataForm();
      },
      error => {console.log(error); }
    );
    this.modalService.dismissAll();
    this.message = "Se eliminó la propuesta";
    setTimeout(() => {
      this.cleanError()
    }, 6000);
  }


  cleanError(){
    this.message = "";
  }

  closeModal(modal){
    this.modalService.dismissAll();
  }

  llenarListaImagenesActivas(lista){
    this.listaActivasUno = [];
    this.listaActivasDos = [];
    this.listaActivasTres = [];
    let index = 1;
    for (let item of lista) 
    {
      if (item.activo){
        if (index%3 === 1)
          this.listaActivasUno.push(item)
        if (index%3 === 2)
          this.listaActivasDos.push(item)
        if (index%3 === 0)
          this.listaActivasTres.push(item)
      }
      index++;
    }
  }

//Carrousel
images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  showNavigationArrows = false;
  showNavigationIndicators = false;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }


}

