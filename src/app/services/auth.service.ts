import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( ) { }

  public acceso2?: string | null = null;
  public nombre?: string | null = null;
  private readonly ACCESS_KEY = 'access_token';

  public get acceso(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  public setAcceso(acceso: string) {
    localStorage.setItem(this.ACCESS_KEY, acceso);
  }

  setAcceso2(acceso: string) {
    this.acceso2 = acceso;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  isLoggedIn(): boolean {
    return !!this.acceso;
  }

  public clearAcceso() {
    localStorage.removeItem(this.ACCESS_KEY);
  }

}
