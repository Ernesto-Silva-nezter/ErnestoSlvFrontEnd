import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CatUsuariosComponent } from './components/cat-usuarios/cat-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'catalogo', component: CatUsuariosComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'formulario', component: FormularioUsuarioComponent, canActivate: [AuthGuard]  },
  { path: 'formulario/:id', component: FormularioUsuarioComponent, canActivate: [AuthGuard]  },
  { path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
