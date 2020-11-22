import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lock-user',
  templateUrl: './lock-user.page.html',
  styleUrls: ['./lock-user.page.scss'],
})
export class LockUserPage implements OnInit {
  public createLockForm: FormGroup;
  private nama: any;
  private user: any;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private  router:  Router,
    private firestoreService : FirestoreService,
    public loadingCtrl: LoadingController,
    public firestore: AngularFireAuth
  ) { 

  }

  ngOnInit() {
    // this.authService.userDetails().subscribe(res=>{
    //   this.nama = res.value.nama;
    //   console.log(this.nama);
    // }
    //   )
    this.user=this.authService.userDetails();
    console.log(this.user);
  }

  async requestLock(){
    
  }

}
