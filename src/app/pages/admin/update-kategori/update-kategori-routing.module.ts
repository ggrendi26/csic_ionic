import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateKategoriPage } from './update-kategori.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateKategoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateKategoriPageRoutingModule {}
