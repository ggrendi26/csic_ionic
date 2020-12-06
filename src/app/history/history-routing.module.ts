import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryPage } from './history.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage
  },  {
    path: 'history-pay',
    loadChildren: () => import('./history-pay/history-pay.module').then( m => m.HistoryPayPageModule)
  },
  {
    path: 'history-lock',
    loadChildren: () => import('./history-lock/history-lock.module').then( m => m.HistoryLockPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryPageRoutingModule {}
