import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataPenggunaAdminPage } from './data-pengguna-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DataPenggunaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPenggunaAdminPageRoutingModule {}
