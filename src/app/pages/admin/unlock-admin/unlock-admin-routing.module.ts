import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnlockAdminPage } from './unlock-admin.page';

const routes: Routes = [
  {
    path: '',
    component: UnlockAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnlockAdminPageRoutingModule {}
