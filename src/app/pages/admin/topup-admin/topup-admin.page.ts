import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-topup-admin",
  templateUrl: "./topup-admin.page.html",
  styleUrls: ["./topup-admin.page.scss"],
})
export class TopupAdminPage implements OnInit {
  addTopUpAdmin: FormGroup;
  validation_messages = {
    nomorVA: [
      { type: "required", message: "Virtual Account Number is required." },
    ],
    totalTopUp: [{ type: "required", message: "Total Topup is required." }],
  };
  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.addTopUpAdmin = this.formBuilder.group({
      nomorVA: new FormControl("", Validators.compose([Validators.required])),
      totalTopUp: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  async tryTopUp(value) {
    if (value) {
      //   db.collection("cities").get().then(function(querySnapshot) {
      //     querySnapshot.forEach(function(doc) {
      //         doc.ref.update({
      //             capital: true
      //         });
      //     });
      // });
      this.firestore
        .collection("users", (ref) =>
          ref.where("virtualAccount", "==", value.nomorVA)
        )
        .ref.get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              saldo: doc.data()["saldo"] + value.totalTopUp,
            });
          });
        });
      this.presentToast();
      this.router.navigateByUrl("/home-admin");
    } else {
      (error) => {
        this.presentToastError();
      };
    }
  }
  async presentToast() {
    let toast = this.toastCtrl.create({
      message: "TopUp success!",
      duration: 2000,
      position: "bottom",
    });

    (await toast).present();
  }
  async presentToastError() {
    let toast = this.toastCtrl.create({
      message: "TopUp error!",
      duration: 2000,
      position: "bottom",
    });

    (await toast).present();
  }
}
