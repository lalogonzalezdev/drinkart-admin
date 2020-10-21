import { Component, OnInit } from '@angular/core';
import { AccesoService } from 'src/app/services/acceso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumRoles } from 'src/app/models/roles';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [AccesoService],
})
export class UserListComponent implements OnInit {
  p = 1;
  title = 'drinkart-app';
  list: any = [];
  email;
  error;
  usuarioEliminado;
  enumRoles = EnumRoles;

  constructor(
    private apiAcceso: AccesoService,
    private modalService: NgbModal
  ) {
    this.getList();
    this.email = '';
  }

  ngOnInit(): void { }

  open(content, usuarioEliminado) {
    this.usuarioEliminado = usuarioEliminado;
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
          this.userDelete(usuarioEliminado.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getList = () => {
    this.apiAcceso.getAllUsers().subscribe(
      (data) => {
        this.list = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getEmailFromList = (email) => {
    if (email != '' && email != undefined) {
      this.apiAcceso.getUsersByEmail(email).subscribe(
        (data) => {
          this.list = data;
          this.p = 1;
          this.error = '';
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.getList();
      this.error = 'Favor de ingresar un email';
    }
  };

  cleanError() {
    this.error = '';
  }

  userDelete = (id) => {
    this.apiAcceso.deleteUser(id).subscribe(
      (data) => {
        this.getList();
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
