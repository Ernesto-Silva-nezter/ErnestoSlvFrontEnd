import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, Estado, Municipios } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private endpoint:string = "http://localhost:5226/";
  private apiUrlUsuario:string = this.endpoint + 'api/Usuario';
  private apiUrlEstado:string = this.endpoint + 'api/Estado';


  constructor(private http: HttpClient) { }

  obtenerTodosUsuarios():Observable<Usuario[]> {
    //console.log(`${this.apiUrlUsuario}/ObtenerTodos`);
    return this.http.get<any>(`${this.apiUrlUsuario}/ObtenerTodos`);
  }

  obtenerUsuario(id:number) {
    return this.http.get(`${this.apiUrlUsuario}/Obtener/${id}`);
  }

  ObtenerUPA(acceso:string) {
    return this.http.get(`${this.apiUrlUsuario}/ObtenerUPA/${acceso}`);
  }

  obtenerTodosP(pagina:number):Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${this.apiUrlUsuario}/ObtenerTodosP/${pagina}-8`);
  }

  crearUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post(`${this.apiUrlUsuario}/Crear`,usuario);
  }

  eliminarUsuario(usuario:Usuario):Observable<void>{
    //console.log(`${this.apiUrlUsuario}/Eliminar/${usuario.id}`);
    return this.http.delete<void>(`${this.apiUrlUsuario}/Eliminar/${usuario.id}`);
  }

  actualizarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<any>(`${this.apiUrlUsuario}/Actualizar`,usuario);
  }

  obtenerEstados():Observable<Estado[]>{
    //console.log(`${this.apiUrlEstado}/ObtenerEstados`);
    return this.http.get<any>(`${this.apiUrlEstado}/ObtenerEstados`);
  }

  obtenerMunicipios(estado:Estado):Observable<Municipios[]>{
    //console.log(`${this.apiUrlEstado}/ObtenerMunicipios/${estado.catalog_Key}`);
    return this.http.get<any>(`${this.apiUrlEstado}/ObtenerMunicipios/${estado.catalog_Key}`);
  }

}
