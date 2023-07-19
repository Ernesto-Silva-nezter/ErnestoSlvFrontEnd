import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario, Estado, Municipios } from 'src/app/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent  implements OnInit {

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
  listaEstados: Estado[] = [];
  listaMunicipios: Municipios[] = [];
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  //userId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ){

  }

  ngOnInit() {
        // Obtener el ID del usuario de los parámetros de la ruta
        this.obtenerEstado();
        const usuarioId = this.route.snapshot.paramMap.get('id');
        if (usuarioId) {
          this._dataService.obtenerUsuario(Number(usuarioId)).subscribe({
            next: (data) => {
              this.tituloAccion = "Editar";
              this.botonAccion = "Actualizar";
              this.usuario = data;
              this.obtenerMunicipio2(this.usuario);
              //console.log("ID trabajar",this.usuario);
            },
            error: (e) => {
              console.log('Error al obtener el usuario', e);
            }
          });
        }
  }

  submitForm(oUsuario: Usuario){
    console.log(oUsuario);

    if(oUsuario.id == 0){
      this._dataService.crearUsuario(oUsuario).subscribe({
        next:(data)=>{
          console.log('Usuario Creado');
          this.presentToast('Usuario Creado con Éxito', 'top');
        },error:(e)=>{
          console.log('Error al crear al Usuario', e);
          this.presentToast('No se pudo crear el usuario', 'top');
        }
      });
    }else{
      this._dataService.actualizarUsuario(oUsuario).subscribe({
        next:(data)=>{
          console.log('Usuario Actualizado');
          this.presentToast('Usuario Actualizado con Éxito', 'top');
        },error:(e)=>{
          console.log('Error al actualizar al Usuario', e);
          this.presentToast('No se pudo actualizar el usuario', 'top');
        }
      });
    }
    //this.router.navigateByUrl('/catalogo');
  }

  isFormValid(): boolean {
    const nombreValido = !!this.usuario.nombre && this.usuario.nombre.trim() !== '';
    const direccionValida = !!this.usuario.direccion && this.usuario.direccion.trim() !== '';
    const telefonoValido = /^[0-9]+$/.test(this.usuario.telefono || '');
    const codigoPostalValido = /^[0-9]+$/.test(this.usuario.codigoPostal || '');
    const tipoUsuarioValido = !!this.usuario.tipoUsuario && this.usuario.tipoUsuario.trim() !== '';
    const estadoValido = !!this.usuario.estado && this.usuario.estado.trim() !== '';
    const ciudadValida = !!this.usuario.ciudad && this.usuario.ciudad.trim() !== '';
    const rolValido = !!this.usuario.rol && this.usuario.rol.trim() !== '';
    const accesoValido = !!this.usuario.acceso && this.usuario.acceso.trim() !== '';
    const contrasenaValida = !!this.usuario.contrasena && this.usuario.contrasena.trim() !== '';

    return (
      nombreValido &&
      direccionValida &&
      telefonoValido &&
      codigoPostalValido &&
      tipoUsuarioValido &&
      estadoValido &&
      //ciudadValida &&
      rolValido &&
      accesoValido &&
      contrasenaValida
    );
  }

  obtenerEstado(){
    this._dataService.obtenerEstados().subscribe({
      next: (data) => {
        //console.log(data);
        this.listaEstados = data;
      },
      error: (e) => {
        console.log("No se pudo obtener los estados", "Error");
      }
    });
  }

  obtenerMuncipio(estado: Estado ){
    this._dataService.obtenerMunicipios(estado).subscribe({
      next: (data) => {
        //console.log(data);
        this.listaMunicipios = data;
      },
      error: (e) => {
        console.log("No se pudo obtener los municipios", "Error");
      }
    });
  }

  obtenerMunicipio2(usuario: Usuario) {
    const estadoSeleccionadoNombre2 = usuario.estado;
    const estadoSeleccionado2 = this.listaEstados.find(estado => estado.entidad_Federativa === estadoSeleccionadoNombre2);

    console.log('OM2',usuario.estado);
    if (estadoSeleccionado2) {
      //const estado = usuario.estado;
      this._dataService.obtenerMunicipios(estadoSeleccionado2).subscribe({
        next: (data) => {
          this.listaMunicipios = data;
        },
        error: (e) => {
          console.log("No se pudo obtener los municipios", "Error");
        }
      });
    }
  }

  onEstadoChange() {
    const estadoSeleccionadoNombre = this.usuario.estado;
    const estadoSeleccionado = this.listaEstados.find(estado => estado.entidad_Federativa === estadoSeleccionadoNombre);

    if (estadoSeleccionado) {
      //this.usuario.ciudad = '';
      this.obtenerMuncipio(estadoSeleccionado);
    } else {
      this.listaMunicipios = [];
    }
  }

  async presentToast(message: string, position: 'top' ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

}


