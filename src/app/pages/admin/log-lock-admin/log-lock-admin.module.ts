import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogLockAdminPageRoutingModule } from './log-lock-admin-routing.module';

import { LogLockAdminPage } from './log-lock-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogLockAdminPageRoutingModule
  ],
  declarations: [LogLockAdminPage]
})
export class LogLockAdminPageModule {}
