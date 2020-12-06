import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryLockPage } from './history-lock.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryLockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryLockPageRoutingModule {}
