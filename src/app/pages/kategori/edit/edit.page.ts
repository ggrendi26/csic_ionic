import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { KategoriService } from 'src/app/services/kategori.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  userEmail: string;
  userKey: string;
  kategori:any;
  namaKategori: string;
  kategoriKey: string;

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private kategoriSrv: KategoriService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  validation_messages = {
    'nama': [
      { type: 'required', message: 'Nama Kategori tidak boleh kosong.' }
    ],
    'max': [
      { type: 'required', message: 'Maksimum Pengeluaran tidak boleh kosong.' }
    ]
  };

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      if(res !== null){
        this.userKey = res.uid;
        this.userEmail = res.email;
      } else {
        this.router.navigateByUrl('login');
        // console.log('kosong');
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('key')) { return; }
      const key = paramMap.get('key');
      this.kategoriKey = key;

      this.db.object('/kategori/' + key).valueChanges().subscribe(data => {
        // console.log('data:', data);
        this.kategori = data;
        this.namaKategori = this.kategori.nama;
        // console.log('this.kategori.nama:', this.kategori.nama);
      });
    });

    this.validations_form = this.formBuilder.group({
      nama: new FormControl('', Validators.compose([
        Validators.required
      ])),
      max: new FormControl('', Validators.compose([
        Validators.required
      ])),
      uid: new FormControl('', Validators.compose([])),
    });

    setTimeout(() => {
      this.validations_form.setValue(this.kategori);
    })
  }

  goBack() {
    this.navCtrl.navigateBack('/kategori');
  }

  deleteKategori(){
    this.kategoriSrv.delete(this.kategoriKey). then(res => {
      console.log(res);
    })
    this.router.navigateByUrl('/kategori');
    this.presentDeleteToast();
  }

  async presentDeleteToast() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Kategori ' + this.namaKategori + ' telah berhasil dihapus.',
      duration: 2000
    });
    toast.present();
  }

  async presentUpdateToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Kategori telah berhasil diperbaharui.',
      duration: 2000
    });
    toast.present();
  }

  onSubmit(value){
    this.kategoriSrv.update(this.kategoriKey, value).then(res=>{
      console.log(res);
      this.router.navigateByUrl('/kategori');
    }).catch(error=> console.log(error));

    this.validations_form.reset();
    this.router.navigateByUrl('/kategori');
    this.presentUpdateToast();
  }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Hapus Kategori',
      message: 'Apakah anda yakin ingin menghapus kategori ' + this.namaKategori + ' ?',
      buttons: [
        {
          text: 'Hapus',
          handler: ()=> this.deleteKategori()
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
}
