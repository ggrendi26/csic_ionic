import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PanduanTopupAdminPageRoutingModule } from "./panduan-topup-admin-routing.module";

import { PanduanTopupAdminPage } from "./panduan-topup-admin.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PanduanTopupAdminPageRoutingModule,
  ],
  declarations: [PanduanTopupAdminPage],
})
export class PanduanTopupAdminPageModule {}
