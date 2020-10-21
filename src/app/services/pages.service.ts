import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  BASE_URL = `${environment.apiUrl}`+'/pages/';

  constructor(private http: HttpClient) { }

  getAllComents(idProducto): Observable<any>{
    return this.http.get(this.BASE_URL + 'blog/'+ idProducto + '/');
  }

  addComment(nombre, comentario, rating, usuarioId, productoId): Observable<any>{

    const uploadData = new FormData();
    uploadData.append('nombre', nombre);
    uploadData.append('comentario', comentario);
    uploadData.append('rating', rating);
    uploadData.append('usuarioId', usuarioId);
    uploadData.append('productoId', productoId);

    return this.http.post(this.BASE_URL + 'blog/', uploadData );
  }

  getHistoriaProductoByPk(pk): Observable<any>{
    return this.http.get(this.BASE_URL + 'historia/' + pk + '/');
  }

  
  agregarPropuestaArtistica(form, usuarioId): Observable<any>{

    const uploadData = new FormData();
    uploadData.append('imagen', form.get('imagen').value);
    uploadData.append('profesion', form.get('profesion').value);
    uploadData.append('historia', form.get('historia').value);
    uploadData.append('facebook', form.get('facebook').value);
    uploadData.append('instagram', form.get('instagram').value);
    uploadData.append('usuarioId', usuarioId);

    return this.http.post(this.BASE_URL + 'propuesta_artistica/', uploadData );
  }


    //Control de propuestas artisticas

    getListaPropuestas(): Observable<any>{
      return this.http.get(this.BASE_URL + 'propuesta_artistica/');
    }
  
    getPropuestaPorPk(pk): Observable<any>{
      return this.http.get(this.BASE_URL + 'propuesta_artistica_detalle/' + pk + '/');
    }
  
    updatePropuestaPorLista(id, activo): Observable<any>{
      const uploadData = new FormData();
      uploadData.append('activo', activo);
      const BODY = uploadData;
      return this.http.post(this.BASE_URL + 'propuesta_artistica_detalle/' + id + '/', BODY );
    }

    deletePropuestaPorLista(id): Observable<any>{
      return this.http.delete(this.BASE_URL + 'propuesta_artistica_detalle/' + id + '/' );
    }

    getCotizaciones(): Observable<any>{
      return this.http.get(this.BASE_URL + 'cotizaciones/');
    }

    eliminarCotizacion(id): Observable<any>{
      return this.http.delete(this.BASE_URL + 'cotizaciones/' + id + '/' );
    }
}
