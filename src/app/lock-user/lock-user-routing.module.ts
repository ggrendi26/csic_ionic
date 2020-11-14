import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LockUserPage } from './lock-user.page';

const routes: Routes = [
  {
    path: '',
    component: LockUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LockUserPageRoutingModule {}
