import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  BASE_URL = `${environment.apiUrl}`+'/carrito/';

  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<any>{
    return this.http.get(this.BASE_URL + 'productos/' );
  }
  getProductPorNombre(nombre:string): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('nombre', nombre);
    return this.http.post(this.BASE_URL + 'filtro_productos/', uploadData);
  }
  getProductoByPk(pk): Observable<any>{
    return this.http.get(this.BASE_URL + 'producto_detalle/' + pk + '/');
  }
  updateProducto(producto): Observable<any>{
    const BODY = producto;
    return this.http.put(this.BASE_URL + 'producto_detalle/' + producto.id + '/', BODY );
  }
  deleteProducto(id): Observable<any>{
    return this.http.delete(this.BASE_URL + 'producto_detalle/' + id + '/' );
  }
  crearProducto(producto): Observable<any>{
    const BODY = {nombre: producto.nombre, precio: producto.precio};
    return this.http.post(this.BASE_URL + 'productos/', BODY );
  }

  addProductToCar(usuarioId, productoId): Observable<any>{

    const uploadData = new FormData();
    uploadData.append('productoId', productoId);
    uploadData.append('usuarioId', usuarioId);

    return this.http.post(this.BASE_URL + 'venta/', uploadData );
  }

  getProductosCarrito(idUsuario): Observable<any>{
    return this.http.get(this.BASE_URL + 'producto_carrito_usuario/'+ idUsuario);
  }

  endVenta(idUsuario, total, domicilio, calle, numero, referencia): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('idUsuario', idUsuario);
    uploadData.append('total', total);
    uploadData.append('asentamiento', domicilio.asentamiento);
    uploadData.append('cp', domicilio.cp);
    uploadData.append('municipio', domicilio.municipio);
    uploadData.append('estado', domicilio.estado);
    uploadData.append('ciudad', domicilio.ciudad);
    uploadData.append('pais', domicilio.pais);
    uploadData.append('calle', calle);
    uploadData.append('numero', numero);
    uploadData.append('referencia', referencia);
    return this.http.post(this.BASE_URL + 'cerrar_venta/', uploadData);
  }

  pagarVenta(idUsuario, total, domicilio, calle, numero, referencia): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('idUsuario', idUsuario);
    uploadData.append('total', total);
    uploadData.append('asentamiento', domicilio.asentamiento);
    uploadData.append('cp', domicilio.cp);
    uploadData.append('municipio', domicilio.municipio);
    uploadData.append('estado', domicilio.estado);
    uploadData.append('ciudad', domicilio.ciudad);
    uploadData.append('pais', domicilio.pais);
    uploadData.append('calle', calle);
    uploadData.append('numero', numero);
    uploadData.append('referencia', referencia);
    return this.http.post(this.BASE_URL + 'cerrar_pagar_venta/', uploadData);
  }

  removeItemCart(idUsuario, idProducto): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('idUsuario', idUsuario);
    uploadData.append('idProducto', idProducto);
    return this.http.post(this.BASE_URL + 'remove_item/', uploadData);
  }

  quitItemCart(idUsuario, idProducto, cantidad): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('idUsuario', idUsuario);
    uploadData.append('idProducto', idProducto);
    uploadData.append('cantidad', cantidad);
    return this.http.post(this.BASE_URL + 'quit_item/', uploadData);
  }

  addItemCart(idUsuario, idProducto, cantidad): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('idUsuario', idUsuario);
    uploadData.append('idProducto', idProducto);
    uploadData.append('cantidad', cantidad);
    return this.http.post(this.BASE_URL + 'add_item/', uploadData);
  }

  getListaVentas(email, fecha_registro, venta_finalizada, pagado, entregado ): Observable<any>{

    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('fecha_registro', fecha_registro);
    uploadData.append('venta_finalizada', venta_finalizada);
    uploadData.append('pagado', pagado);
    uploadData.append('entregado', entregado);

    return this.http.post(this.BASE_URL + 'lista_ventas/', uploadData );
  }

  getListaVentasPk(pk): Observable<any>{
    return this.http.get(this.BASE_URL + 'lista_ventas_detalle/' + pk + '/');
  }
  

  getProductosPorVenta(idVenta): Observable<any>{
    return this.http.get(this.BASE_URL + 'producto_carrito_venta/'+ idVenta);
  }

  updateListaVentas(venta): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('pagado', venta.pagado);
    uploadData.append('entregado', venta.entregado);
    const BODY = uploadData;
    return this.http.post(this.BASE_URL + 'lista_ventas_detalle/' + venta.id + '/', BODY );
  }
  deleteListaVentas(id): Observable<any>{
    return this.http.delete(this.BASE_URL + 'lista_ventas_detalle/' + id + '/' );
  }

  getDireccionList(codigo): Observable<any>{
    // headers: { "Access-Control-Allow-Headers" : "Content-Type", "Access-Control-Allow-Origin": "https://www.example.com", "Access-Control-Allow-Methods": "OPTIONS,POST,GET" },
    return this.http.get('https://api-sepomex.hckdrk.mx/query/info_cp/' + codigo + '/');
  }
  getAllEventos(): Observable<any>{
    return this.http.get(this.BASE_URL + 'eventos/' );
  }

  reservarEventoUsuario(usuarioId, eventoId, lugares_reservados): Observable<any>{

    const uploadData = new FormData();
    uploadData.append('eventoId', eventoId);
    uploadData.append('usuarioId', usuarioId);
    uploadData.append('lugares_reservados', lugares_reservados);

    return this.http.post(this.BASE_URL + 'reservar_evento/', uploadData );
  }
  enviarReservacion(idReservacion): Observable<any>{
    return this.http.get(this.BASE_URL + 'enviar_reservacion/' + idReservacion);
  }

  getCategorias(): Observable<any>{
    return this.http.get(this.BASE_URL + 'get_categorias/' );
  }

  filtroCategoria(id): Observable<any>{
    return this.http.get(this.BASE_URL + 'filtrar_categoria/' + id + '/');
  }

  //Control eventos


  getListaReservaciones(email, fecha_evento, pagado, nombre ): Observable<any>{

    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('fecha_evento', fecha_evento);
    uploadData.append('pagado', pagado);
    uploadData.append('nombre', nombre);

    return this.http.post(this.BASE_URL + 'lista_reservaciones/', uploadData );
  }

  getReservacionPorPk(pk): Observable<any>{
    return this.http.get(this.BASE_URL + 'lista_reservaciones_detalle/' + pk + '/');
  }


  updateReservacionPorLista(reservacion): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('pagado', reservacion.pagado);
    const BODY = uploadData;
    return this.http.post(this.BASE_URL + 'lista_reservaciones_detalle/' + reservacion.id + '/', BODY );
  }
  deleteReservacionPorLista(id): Observable<any>{
    return this.http.delete(this.BASE_URL + 'lista_reservaciones_detalle/' + id + '/' );
  }

}
