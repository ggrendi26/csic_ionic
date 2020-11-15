import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahKategoriPage } from './tambah-kategori.page';

const routes: Routes = [
  {
    path: '',
    component: TambahKategoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahKategoriPageRoutingModule {}
