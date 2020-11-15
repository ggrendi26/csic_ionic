import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahKategoriPageRoutingModule } from './tambah-kategori-routing.module';

import { TambahKategoriPage } from './tambah-kategori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahKategoriPageRoutingModule
  ],
  declarations: [TambahKategoriPage]
})
export class TambahKategoriPageModule {}
