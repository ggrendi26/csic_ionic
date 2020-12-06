import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPayPageRoutingModule } from './history-pay-routing.module';

import { HistoryPayPage } from './history-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPayPageRoutingModule
  ],
  declarations: [HistoryPayPage]
})
export class HistoryPayPageModule {}
