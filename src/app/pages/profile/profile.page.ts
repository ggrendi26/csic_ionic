import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = null;
  uid;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private  router:  Router,
    private firestoreService : FirestoreService,
    public loadingCtrl: LoadingController,
  ) { 
   

    // this.profile = this.firestoreService.getUserInfo(this.authService.getUID());
    // this.profile = this.authService.isAuthenticated();
    // this.profile = this.authService.getUID();
    // console.log(this.profile);
    // db.collection('books').doc('fK3ddutEpD2qQqRMXNW5').get();
  }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      if(res !== null){
        this.uid = res.uid;
        this.getUserInfo();

      } else {
        this.uid = '';
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });
  }
  getUserInfo(){
    this.firestoreService.getUserInfo(this.uid).then((doc) => {
      if(doc.exists){
        console.log(doc.data());
        this.profile = doc.data();
      }else{
        console.log('error getting document', doc)
      }
  }).catch(function (error){
    console.log('error getting document', error)
  });
  }
  editProfile(){
      this.router.navigateByUrl('/profile/edit');
  }
}
