import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-history-lock',
  templateUrl: './history-lock.page.html',
  styleUrls: ['./history-lock.page.scss'],
})
export class HistoryLockPage implements OnInit {
  userEmail: string;
  userKey: string;
  datas=[];
  user: any;
  jumlahSaldo: any;
  lockDatas: any;
  inDatas: any;
  inShow = [];
  LenIn = 0;
  constructor(
    private firestoreService: FirestoreService,
    private authSrv: AuthService,
    private router: Router,
    public firestore: AngularFirestore
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

  getDataHistoryLock(){
    this.firestoreService.getAllLockDatas().then((docs)=>{
      this.lockDatas = docs;
      // console.log(this.lockDatas);
     }).catch(function(error) {
    });
  }

}