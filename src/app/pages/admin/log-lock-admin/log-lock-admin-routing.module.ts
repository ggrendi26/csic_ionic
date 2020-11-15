import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogLockAdminPage } from './log-lock-admin.page';

const routes: Routes = [
  {
    path: '',
    component: LogLockAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogLockAdminPageRoutingModule {}
