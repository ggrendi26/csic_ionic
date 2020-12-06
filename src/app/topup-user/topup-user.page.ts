import { Component, OnInit } from '@angular/core';
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
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-topup-user',
  templateUrl: './topup-user.page.html',
  styleUrls: ['./topup-user.page.scss'],
})
export class TopupUserPage implements OnInit {
  public toggleView(item){
    item.showDetails = !item.showDetails
}
  uid;
  panduan;
  public showDetails: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    public firestore: AngularFireAuth,
    private toastCtrl: ToastController
  ) { 
    
  }

  ngOnInit() {
    this.firestoreService.getPanduanTopup().then((data)=>{
      console.log(data);
      this.panduan = data;
    })
  
  }

}
