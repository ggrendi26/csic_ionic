import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { KategoriService } from 'src/app/services/kategori.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  userEmail: string;
  userKey: string;
  validations_form: FormGroup;
  errorMessage: string = '';
  kategoriName: string;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private kategoriSrv: KategoriService,
    private toastController: ToastController
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
        this.userEmail = res.email;
        this.userKey = res.uid;
        // console.log(this.userKey);
      } else {
        this.router.navigateByUrl('login');
        // console.log('kosong');
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
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
  }

  goBack() {
    this.navCtrl.navigateBack('/kategori');
  }

  onSubmit(value){
    this.kategoriSrv.create(value).then(res => {
      console.log(res);
      // console.log(value.uid);
      this.kategoriName = value.nama;
      this.validations_form.reset(value);
      this.router.navigateByUrl('/kategori');
      this.presentToast();
    }).catch(error => console.log(error));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Kategori ' + this.kategoriName + ' telah berhasil ditambahkan.',
      duration: 2000
    });
    toast.present();
  }
}
