import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { KategoriService } from 'src/app/services/kategori.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  sisaPembayaran: number;
  saldoUser: number;

  userEmail: string;
  userKey: string;

  user: any;
  Allkategori: any;
  AllPayments: any;

  validations_form: FormGroup;
  errorMessage: string = '';

  kategori = [];
  paymentData = [];
  myDate: String = new Date().toISOString().substring(0, 10);

  validation_messages = {
    'virtualacc': [
      { type: 'required', message: 'Nomor Virtual Account tidak boleh kosong.' }
    ],
    'totalpayment': [
      { type: 'required', message: 'Nominal Pengeluaran tidak boleh kosong.' }
    ],
    'kategori': [
      { type: 'required', message: 'Jenis Kategori tidak boleh kosong.' }
    ]
  };

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private kategoriSrv: KategoriService,
    private paymentSrv: PaymentService,
    private userSrv: FirestoreService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
  }

  ngOnInit() {

    this.authSrv.userDetails().subscribe(res => {
      if(res !== null){
        this.userEmail = res.email;
        this.userKey = res.uid;
        // console.log(this.userKey);
      } else {
        this.router.navigateByUrl('login');
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });

    this.validations_form = this.formBuilder.group({
      virtualacc: new FormControl('', Validators.compose([
        Validators.required
      ])),
      totalpayment: new FormControl('', Validators.compose([
        Validators.required
      ])),
      kategori: new FormControl('', Validators.compose([
        Validators.required
      ])),
      catatan: new FormControl('', Validators.compose([])),
      paymentdate: new FormControl(this.myDate, Validators.compose([])),
      targetid: new FormControl('', Validators.compose([])),
      uid: new FormControl(this.userKey, Validators.compose([])),
    });
  }

  ionViewDidEnter(){
    this.kategoriSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
      )
    ).subscribe(data => {
      this.Allkategori = data;
      // console.log(this.userKey);
      for(var i = 0; i < this.Allkategori.length; i++){
        if(this.Allkategori[i].uid === this.userKey){
          // console.log(this.Allkategori[i]);
          this.kategori.push(this.Allkategori[i]);
        }
      }
      if(this.kategori.length == 0){
        this.presentNoKategoriAlert();
      }
    });

    this.paymentSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
      )
    ).subscribe(data => {
      this.AllPayments = data;
      // console.log(this.userKey);
      for(var i = 0; i < this.AllPayments.length; i++){
        if(this.AllPayments[i].uid === this.userKey && this.AllPayments[i].paymentdate == this.myDate){
          // console.log(this.Allkategori[i]);
          this.paymentData.push(this.AllPayments[i]);
        }
      }
    });

    //get current user detail
    this.userSrv.getUserInfo(this.userKey).then((doc) => {
      if(doc.exists){
        // console.log(doc.data());
        this.user = doc.data();
        this.saldoUser = this.user.saldo;
        // console.log(this.saldoUser);
      }else{
        console.log('error getting document', doc)
      }
    }).catch(function (error){
      console.log('error getting document', error)
    });
  }


  async presentNoKategoriAlert() {
    const alert = await this.alertController.create({
      header: 'Tidak Ada Kategori',
      message: 'Anda Perlu membuat kategori pembayaran terlebih dahulu!',
      buttons: [
        {
          text: 'Home',
          handler: ()=> this.router.navigateByUrl('/index')
        },
        {
          text: 'Buat Kategori',
          handler: ()=> this.router.navigateByUrl('/kategori/create')
        }
      ]
    });
    await alert.present();
  }

  onSubmit(value){
    var maxKategori;
    var totalPaid = 0;
    // console.log(value.virtualacc);

    // check saldo cukup atau ga 
    if(value.totalpayment > this.saldoUser){
      this.presentSaldoKurangAlert();
    }else{
      // check virtual account valid / ga

      // check lewatin max atau ga
      for(var i = 0; i < this.kategori.length; i++){
        if(this.kategori[i].nama === value.kategori){
          maxKategori = this.kategori[i].max;
          break;
        }
      }

      if(this.paymentData.length == 0){
        totalPaid = 0;
      }else {
        for(var i=0; i < this.paymentData.length; i++){
          if(this.paymentData[i].kategori === value.kategori){
            totalPaid = totalPaid + this.paymentData[i].totalpayment;
          }else totalPaid = 0;
        }
      }

      this.sisaPembayaran = maxKategori - totalPaid;
      // console.log("Sisa Pembayaran: " + maxKategori);
      // console.log("Sisa Pembayaran: " + this.sisaPembayaran);

      if(this.sisaPembayaran < value.totalpayment){
        this.presentTooMuchPaymentAlert();
      }else{
        this.paymentCheckerAlert(value.virtualacc, value.totalpayment, value.catatan, value);
      }
    }
  }

  onCancel(){
    this.validations_form.reset();
    this.navCtrl.navigateBack('/index');
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

  async paymentCheckerAlert(virtualacc: string, totalpayment: number, catatan: string, value:any){
    const alert = await this.alertController.create({
      header: 'Konfirmasi Pembayaran',
      message: 'Nama: <br>No: ' +  virtualacc + '<br>Total: Rp. ' + totalpayment + ',-<br>Catatan: ' + catatan,
      buttons: [
        {
          text: 'Bayar',
          handler: ()=> this.submitData(value)
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async presentTooMuchPaymentAlert() {
    const alert = await this.alertController.create({
      header: 'Pembayaran tidak bisa dilakukan!',
      message: 'Sisa transaksi yang bisa anda lakukan hanya tersisa ' + this.sisaPembayaran + ' rupiah!',
      buttons: [
        {
          text: 'Hemat saja',
          handler: ()=> this.router.navigateByUrl('/index'),
        },
        {
          text: 'Ganti Harga',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  submitData(value){
    this.paymentSrv.create(value).then(res => {
      // console.log(res);
      var userCreditsNow = this.saldoUser - value.totalpayment;
      this.userSrv.minUserCredits(userCreditsNow, this.userKey);
      
      this.router.navigateByUrl('/index');
      this.validations_form.reset();
    }).catch(error => console.log(error));
  }
   
  async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Pembayaran telah berhasil dilakukan.',
      duration: 2000
    });
    toast.present();
  }
}
