import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { KategoriService } from 'src/app/services/kategori.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  user: any;
  userEmail: string;
  userKey: string;
  Allkategori: any;
  validations_form: FormGroup;
  errorMessage: string = '';
  kategori = [];
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
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {

    console.log(this.user);
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
    console.log(value.virtualacc);

    for(var i = 0; i < this.kategori.length; i++){
      if(this.kategori[i].nama === value.kategori){
        maxKategori = this.kategori[i].max;
        break;
      }
    }

    // console.log(maxKategori);
  }

  onCancel(){
    this.validations_form.reset();
    this.navCtrl.navigateBack('/index');
  }
   
}
