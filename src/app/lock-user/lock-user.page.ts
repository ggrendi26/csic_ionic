import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController, NavController, ToastController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { FirestoreService } from "../services/firestore.service";
import { AngularFirestore } from "@angular/fire/firestore";
import * as moment from 'moment';

@Component({
  selector: "app-lock-user",
  templateUrl: "./lock-user.page.html",
  styleUrls: ["./lock-user.page.scss"],
})
export class LockUserPage implements OnInit {
  uid;
  data: any;
  profile = null;
  nomorVA: any;
  saldoUser: number;
  saldoBefore: number;
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
    public firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private alertController: AlertController,
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

    this.firestoreService.getUserInfo(this.uid).then((doc) => {
      if(doc.exists){
        // console.log(doc.data());
        this.profile = doc.data();
        this.saldoBefore = this.profile.saldo;
        console.log(this.saldoBefore)
      }else{
        console.log('error getting document', doc)
      }
    }).catch(function (error){
      console.log('error getting document', error)
    });

   
    var docRef = this.firestore.doc(`users/${this.uid}`);
    this.firestore.collection('users').doc(this.uid).valueChanges().subscribe(doc =>{
      // console.log(doc)
      this.data = doc;
      this.nomorVA = this.data.virtualAccount;
      // console.log(this.nomorVA)
    });
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
      if(value.saldoLock > this.saldoBefore){
        this.presentSaldoKurangAlert();
      }else{
        this.firestore.doc(`users/${this.uid}`).update({saldo:this.saldoBefore - value.saldoLock});
      }
    
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

async presentSaldoKurangAlert(){
  const alert = await this.alertController.create({
    header: 'Saldo Tidak Mencukupi',
    message: 'Mohon maaf salda anda tidak mencukupi. Silahkan melakukan TopUp terlebih dahulu.',
    buttons: [
      {
        text: "TopUp",
        handler: ()=> this.router.navigateByUrl('topup-user')
      }
    ]
  });
  await alert.present();
}


}
