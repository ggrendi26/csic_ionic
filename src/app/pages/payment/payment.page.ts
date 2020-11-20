import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { KategoriService } from 'src/app/services/kategori.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  userEmail: string;
  userKey: string;
  Allkategori: any;
  kategori = [];

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private kategoriSrv: KategoriService,
    private alertController: AlertController
  ) { }

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
  }

  ionViewDidEnter(){
    this.kategoriSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
      )
    ).subscribe(data => {
      this.Allkategori = data;
      console.log(this.userKey);
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

  onSubmit(form: NgForm){
    // console.log(form);
  }
}
