import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupUserPageRoutingModule } from './topup-user-routing.module';

import { TopupUserPage } from './topup-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupUserPageRoutingModule
  ],
  declarations: [TopupUserPage]
})
export class TopupUserPageModule {}
