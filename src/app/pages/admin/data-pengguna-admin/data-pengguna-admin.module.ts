import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataPenggunaAdminPageRoutingModule } from './data-pengguna-admin-routing.module';

import { DataPenggunaAdminPage } from './data-pengguna-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataPenggunaAdminPageRoutingModule
  ],
  declarations: [DataPenggunaAdminPage]
})
export class DataPenggunaAdminPageModule {}
