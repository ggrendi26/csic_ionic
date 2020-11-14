import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategoriPage } from './kategori.page';

const routes: Routes = [
  {
    path: '',
    component: KategoriPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'edit/:key',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategoriPageRoutingModule {}
