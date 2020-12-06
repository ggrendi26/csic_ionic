import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryLockPageRoutingModule } from './history-lock-routing.module';

import { HistoryLockPage } from './history-lock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryLockPageRoutingModule
  ],
  declarations: [HistoryLockPage]
})
export class HistoryLockPageModule {}
