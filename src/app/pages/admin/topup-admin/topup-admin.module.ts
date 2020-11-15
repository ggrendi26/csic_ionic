import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupAdminPageRoutingModule } from './topup-admin-routing.module';

import { TopupAdminPage } from './topup-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupAdminPageRoutingModule
  ],
  declarations: [TopupAdminPage]
})
export class TopupAdminPageModule {}
