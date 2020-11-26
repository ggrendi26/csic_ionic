import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.page.html',
  styleUrls: ['./index-user.page.scss'],
})
export class IndexUserPage implements OnInit {

  profile = null;
  profileImageUrl = ""

  userEmail: string;
  userKey: string;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      if(res !== null){
        this.userEmail = res.email;
        this.userKey = res.uid;
      } else {
        this.router.navigateByUrl('/login');
        // console.log('kosong');
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });
  }

  ionViewDidEnter(){
    this.firestoreService.getUserInfo(this.userKey).then((doc) => {
      if(doc.exists){
        // console.log(doc.data());
        this.profile = doc.data();
        this.firestoreService.getProfileImageUrl(this.profile.profileImageUrl).then((res)=>{
          this.profileImageUrl = res;
          // console.log(res)
        }).catch((error)=>{
            console.log(error);
        });
      }else{
        console.log('error getting document', doc)
      }
    }).catch(function (error){
      console.log('error getting document', error)
    });
  }
}
