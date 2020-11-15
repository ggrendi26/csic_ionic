import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateKategoriPageRoutingModule } from './update-kategori-routing.module';

import { UpdateKategoriPage } from './update-kategori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateKategoriPageRoutingModule
  ],
  declarations: [UpdateKategoriPage]
})
export class UpdateKategoriPageModule {}
