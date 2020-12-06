import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, NavController, ToastController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { FirestoreService } from "../services/firestore.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { isAfter } from 'date-fns'
import * as moment from 'moment';

@Component({
  selector: "app-lock-user",
  templateUrl: "./lock-user.page.html",
  styleUrls: ["./lock-user.page.scss"],
})
export class LockUserPage implements OnInit {
  uid;
  createLockForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";
  validation_messages = {
    dateLock: [{ type: "required", message: "End date is required." }],
    saldoLock: [{ type: "required", message: "Balance is required." }],
  };
  private currDate: string = new Date().toISOString().substr(0, 10);
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    public firestore: AngularFireAuth,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.authService.userDetails().subscribe(
      (res) => {
        if (res !== null) {
          this.uid = res.uid;
        } else {
          this.uid = "";
        }
      },
      (err) => {
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    );
    this.createLockForm = this.formBuilder.group({
      dateLock: new FormControl("", Validators.compose([Validators.required])),
      saldoLock: new FormControl("", Validators.compose([Validators.required])),
      catatanLock: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  async requestLock(value) {
    const loading = await this.loadingCtrl.create();
    console.log(value.dateLock);
    console.log(value.saldoLock);
    console.log(value.catatanLock);
    
    this.firestoreService
      .createLockForm(value.dateLock, value.saldoLock, value.catatanLock, this.currDate, this.uid)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.presentToast();
            this.router.navigateByUrl("/index");
          });
        },
        (error) => {
          loading.dismiss().then(() => {
            this.presentToastError();
            console.error(error);
          });
        }
      );

    return await loading.present();
  }

  async presentToast() {
    let toast = this.toastCtrl.create({
      message: "Lock balance success!",
      duration: 2000,
      position: "bottom",
    });

    (await toast).present();
  }
  async presentToastError() {
    let toast = this.toastCtrl.create({
      message: "Lock balance error!",
      duration: 2000,
      position: "bottom",
    });

    (await toast).present();
  }
  
  setDate(getDate){
    var check = moment(getDate).isAfter();
    console.log(getDate, check);
}
}
