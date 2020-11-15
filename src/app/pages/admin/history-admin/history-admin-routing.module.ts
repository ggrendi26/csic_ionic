import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryAdminPage } from './history-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryAdminPageRoutingModule {}
