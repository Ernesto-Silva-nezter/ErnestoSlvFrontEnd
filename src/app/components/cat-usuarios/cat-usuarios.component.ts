import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { InfiniteScrollCustomEvent, IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cat-usuarios',
  templateUrl: './cat-usuarios.component.html',
  styleUrls: ['./cat-usuarios.component.scss'],
})
export class CatUsuariosComponent  implements OnInit {
  formUsuario: FormGroup | undefined;
  listaUsuarios: Usuario[] = [];
  contador: number = 1;
  estadoContrasena = false;

  @ViewChild(IonList)
  ionList!: IonList;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    private router: Router,
    private toastController: ToastController
    ){
  }

  ngOnInit() {
    //this.mostrarUsuariosP();

    if (this.router.url === '/catalogo') {
      this.mostrarUsuariosP();
    }
  }


  editarUsuario(usuario: Usuario){
    //console.log(usuario);
    this.ionList.closeSlidingItems();
    this.router.navigate(['/formulario', usuario.id]);
  }

  eliminarUsuario(usuario: Usuario){
    this._dataService.eliminarUsuario(usuario).subscribe({
      next:(data)=>{
        console.log('Usuario Eliminado');
        this.presentToast('Usuario Eliminado con Éxito', 'top');
        this.mostrarUsuarios();
      },error:(e)=>{
        console.log('Error al eliminar al Usuario', e);
        this.presentToast('No se pudo eliminar el usuario', 'top');
        this.mostrarUsuarios();
      }
    });
    this.ionList.closeSlidingItems();
  }

  mostrarUsuarios() {
    this._dataService.obtenerTodosUsuarios().subscribe({
      next: (data) => {
        //console.log(data);
        this.listaUsuarios = data;
      },
      error: (e) => {
        console.log("No se pudo obtener todos los usuarios", "Error");
      }
    });
  }

  mostrarUsuariosP() {
    this._dataService.obtenerTodosP(this.contador).subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        console.log(data);
        //console.log('CONTADOR: ',this.contador);
        this.contador++;
      },
      error: (e) => {
        console.log("No se pudo obtener todos los usuarios", "Error");
      }
    });
  }

  async presentToast(message: string, position: 'top' ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

  reloadList(){
    this.contador = 1;
    this.mostrarUsuariosP();
  }

  onIonInfinite(event?: any){
    this._dataService.obtenerTodosP(this.contador).subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i++) {
          this.listaUsuarios.push(data[i]);
        }
        console.log(data);
        //console.log('CONTADOR: ',this.contador);
        this.contador++;

        if(event){
          event.target.complete();
          //console.log('DATA: ',data.length);
          if(data.length === 0){
            event.target.disable = true;
          }
        }
      },
      error: (e) => {
        console.log("No se pudo obtener todos los usuarios", "Error");
      }
    });

  }

  ocultarContrasena(contrasena: string | undefined): string {
    if (contrasena) {
      return this.estadoContrasena ? contrasena : '*'.repeat(contrasena.length);
    }
    return '';
  }

  mostrarContrasena(): void {
    this.estadoContrasena = !this.estadoContrasena;;
  }

}
