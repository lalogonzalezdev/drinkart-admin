import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  p = 1;
  title = 'drinkart-app';
  list: any = [];
  email;
  error;
  cotizacionEliminada;

  constructor(
    private pagesService: PagesService,
    private modalService: NgbModal
  ) {
    this.getList();
    this.email = '';
  }

  ngOnInit(): void { }

  open(content, cotizacionEliminada) {
    this.cotizacionEliminada = cotizacionEliminada;
    this.modalService
      .open(content, {
        size: 'sm',
        scrollable: true,
        backdropClass: 'light-blue-backdrop',
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then((result) => {
        if (result === 'save') {
          this.eliminarCotizacion(cotizacionEliminada.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getList = () => {
    this.pagesService.getCotizaciones().subscribe(
      (data) => {
        this.list = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  cleanError() {
    this.error = '';
  }

  eliminarCotizacion = (id) => {
    this.pagesService.eliminarCotizacion(id).subscribe(
      (data) => {
        this.getList();
        this.error = "Se eliminó la cotización correctamente";
        setTimeout(() => {
          this.cleanError()
        }, 6000);
      },
      (error) => {
        console.log(error);
      }
    );
  };

}
