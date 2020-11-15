import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnlockAdminPageRoutingModule } from './unlock-admin-routing.module';

import { UnlockAdminPage } from './unlock-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnlockAdminPageRoutingModule
  ],
  declarations: [UnlockAdminPage]
})
export class UnlockAdminPageModule {}
