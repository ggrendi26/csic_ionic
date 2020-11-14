import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LockUserPageRoutingModule } from './lock-user-routing.module';

import { LockUserPage } from './lock-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LockUserPageRoutingModule
  ],
  declarations: [LockUserPage]
})
export class LockUserPageModule {}
