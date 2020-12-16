import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.page.html',
  styleUrls: ['./index-user.page.scss'],
})
export class IndexUserPage implements OnInit {

  profile = null;
  profileImageUrl = ""
  tempImageUrl = ""

  userEmail: string;
  userKey: string;

  // untuk length topup (in), payment (out), lock (lock)
  in = [];
  out = [];
  lock = [];

  inDatas: any;
  outDatas: any;
  lockDatas: any;

  inShow = [];
  outShow = [];
  lockShow = [];

  LenOut = 0;
  LenIn = 0;
  LenLock = 0;

  refreshImage="";
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private firestoreService: FirestoreService,
    private paymentSrv: PaymentService,
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
    this.in = [];
    this.out = [];
    this.lock = [];
    this.inShow = [];
    this.outShow = [];
    this.lockShow = [];
    this.profileImageUrl = "../../../assets/img/user.png";
    
    this.firestoreService.getUserInfo(this.userKey).then((doc) => {
      if(doc.exists){
        // console.log(doc.data());
        this.profile = doc.data();
        // this.firestoreService.getProfileImageUrl(this.profile.profileImageUrl).subscribe((res)=>{
        //   this.profileImageUrl = res;
        // })
      }else{
        console.log('error getting document', doc)
      }
    }).catch(function (error){
      console.log('error getting document', error)
    });

    // pengeluaran (out)
    this.paymentSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
      )
    ).subscribe(data => {
      this.outDatas = data;
      for(var i = 0; i < this.outDatas.length; i++){
        if(this.outDatas[i].uid === this.userKey){
          this.out.push(this.outDatas[i]);
        }
      }
      if(this.out.length >= 3){ 
        for(var i = 0; i < 3; i++){
          this.outShow.push(this.out[i]);
        }
      }else{
        this.outShow = this.out;
      }
      this.LenOut = this.outShow.length;
    });

    // Penguncian (lock)
    this.firestoreService.getAllLockDatas().then((docs)=>{
      this.lockDatas = docs;
      // console.log(this.lockDatas);
     }).catch(function(error) {
    });

    if(this.lockDatas != undefined){
      for(let u of this.lockDatas){
        if(u.uid === this.userKey){
          this.lock.push(u);
        }
      }
    }else{
      this.lock = []
    }
   
    if(this.lock.length >= 3){
      for(var i = 0; i < 3; i++){
        this.lockShow.push(this.lock[i]);
      }
    }else {
      this.lockShow = this.lock;
    }

    this.LenLock = this.lockShow.length;

    // Pemasukan (in)
    this.firestoreService.getAllTopUpDatas().then((docs)=>{
      this.inDatas = docs;
      // console.log(this.lockDatas);
     }).catch(function(error) {
    });

    if(this.inDatas != undefined){
      for(let u of this.inDatas){
        if(u.uid === this.userKey){
          this.in.push(u);
        }
      }
    }else{
      this.in = []
    }
   
    if(this.in.length >= 3){
      for(var i = 0; i < 3; i++){
        this.inShow.push(this.in[i]);
      }
    }else {
      this.inShow = this.in;
    }
    
    this.LenIn = this.inShow.length;

  }
}
