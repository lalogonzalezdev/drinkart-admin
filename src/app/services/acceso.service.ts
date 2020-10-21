import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {


  BASE_URL = `${environment.apiUrl}`+'/acceso/';

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<any>{
    return this.http.get(this.BASE_URL + 'usuarios/' );
  }
  getUsersByEmail(email:string): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('email', email);
    return this.http.post(this.BASE_URL + 'filtro_usuarios/', uploadData);
  }
  getUserByPk(pk): Observable<any>{
    return this.http.get(this.BASE_URL + 'usuarios_detail/' + pk + '/');
  }
  updateUser(user): Observable<any>{
    const BODY = user;
    return this.http.put(this.BASE_URL + 'usuarios_detail/' + user.id + '/', BODY );
  }
  registerUser(user): Observable<any>{
    const BODY = user;
    return this.http.post(this.BASE_URL + 'usuarios/', BODY );
  }

  deleteUser(id): Observable<any>{
    return this.http.delete(this.BASE_URL + 'usuarios_detail/' + id + '/' );
  }

  sendEmailPorConfirmar(email): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('email', email);
    return this.http.post(this.BASE_URL + 'send_email_por_confirmar/', uploadData);
  }

  sendEmailParaReestablecerPassword(email): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('email', email);
    return this.http.post(this.BASE_URL + 'send_email_reestablecer_password/', uploadData);
  }

  verificarTokenPorEmail(email:string, token:string): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('token', token);
    return this.http.post(this.BASE_URL + 'verificar_token_por_email/', uploadData);
  }

  getRolesList(): Observable<any>{
    return this.http.get(this.BASE_URL + 'roles/' );
  }

  sendEmailData(nombre, email, mensaje): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('nombre', nombre);
    uploadData.append('email', email);
    uploadData.append('mensaje', mensaje);
    return this.http.post(this.BASE_URL + 'send_email_data/', uploadData);
  }

}
