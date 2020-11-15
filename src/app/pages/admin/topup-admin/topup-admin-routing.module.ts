import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupAdminPage } from './topup-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TopupAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupAdminPageRoutingModule {}
