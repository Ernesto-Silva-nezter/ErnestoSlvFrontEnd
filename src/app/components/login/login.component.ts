import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    codigoPostal: '',
    tipoUsuario: '',
    estado: '',
    ciudad: '',
    rol: '',
    acceso: '',
    contrasena: '',
  };
  acceso: string = '';
  contrasena: string = '';
  nombre: string = '';

  constructor(
    private _dataService: DataService,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() {}

  onLogin() {
    this._dataService.ObtenerUPA(this.acceso).subscribe(
      (data: any) => {
        if ( data === null) {
          console.log('Acceso denegado. Comprueba tus credenciales.');
          this.presentToast('Acceso denegado. Comprueba tus credenciales.', 'top');
        }else{
          this.usuario = data;
          if (this.usuario.nombre !== undefined) {
            this.nombre = this.usuario.nombre;
          }
          if (this.usuario.contrasena === this.contrasena) {
            this.authService.setAcceso2(this.acceso);
            this.authService.setNombre(this.nombre);
            this.authService.setAcceso(this.acceso);
            this.acceso = '';
            this.contrasena = '';
            this.presentToast('¡Bienvenido! Has iniciado sesión exitosamente.', 'top');
            this.router.navigateByUrl('/catalogo');
          } else {
            console.log('Acceso denegado. Comprueba tus credenciales.');
            this.presentToast('Acceso denegado. Comprueba tus credenciales.', 'top');
          }
        }
      },
      (error) => {
        console.log('Error al obtener los datos del usuario:', error);
      }
    );
  }

  isFormValid(): boolean {
    const accesoValido = !!this.acceso && this.acceso.trim() !== '';
    const contrasenaValida = !!this.contrasena && this.contrasena.trim() !== '';

    return (
      accesoValido &&
      contrasenaValida
    );
  }

  async presentToast(message: string, position: 'top' ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

  forgotPassword(){

  }

}
