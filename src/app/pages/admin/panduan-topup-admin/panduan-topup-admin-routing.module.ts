import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanduanTopupAdminPage } from './panduan-topup-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PanduanTopupAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanduanTopupAdminPageRoutingModule {}
