import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryAdminPageRoutingModule } from './history-admin-routing.module';

import { HistoryAdminPage } from './history-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryAdminPageRoutingModule
  ],
  declarations: [HistoryAdminPage]
})
export class HistoryAdminPageModule {}
