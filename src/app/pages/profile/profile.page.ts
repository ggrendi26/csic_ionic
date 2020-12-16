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
  profileImageUrl = "../assets/img/user.png";
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private  router:  Router,
    private firestoreService : FirestoreService,
    public loadingCtrl: LoadingController,
  ) { 
   
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
        if(this.firestoreService.imageUrl != ""){
          this.profileImageUrl = this.firestoreService.imageUrl;

        }else{
          this.firestoreService.getProfileImageUrl(this.profile.profileImageUrl).subscribe((res)=>{
          this.profileImageUrl = res;
          console.log(res)
        })
        }
        
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
