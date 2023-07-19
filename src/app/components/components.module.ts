import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { CatUsuariosComponent } from './cat-usuarios/cat-usuarios.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    CatUsuariosComponent,
    FormularioUsuarioComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppRoutingModule
  ],
  exports: [
    CatUsuariosComponent,
    FormularioUsuarioComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
