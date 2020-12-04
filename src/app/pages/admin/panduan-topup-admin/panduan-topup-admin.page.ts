import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-panduan-topup-admin",
  templateUrl: "./panduan-topup-admin.page.html",
  styleUrls: ["./panduan-topup-admin.page.scss"],
})
export class PanduanTopupAdminPage implements OnInit {
  addPanduanTopup: FormGroup;
  validation_messages = {
    namaPanduan: [{ type: "required", message: "Name is required." }],
    deskripsiPanduan: [
      { type: "required", message: "Description is required." },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.addPanduanTopup = this.formBuilder.group({
      namaPanduan: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      deskripsiPanduan: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  async tryAddPanduanTopup(value) {
    const loading = await this.loadingCtrl.create();

    this.firestoreService
      .addPanduanTopup(value.namaPanduan, value.deskripsiPanduan)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl("/home-admin");
          });
        },
        (error) => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

    return await loading.present();
  }
}
