import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupUserPage } from './topup-user.page';

const routes: Routes = [
  {
    path: '',
    component: TopupUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupUserPageRoutingModule {}
