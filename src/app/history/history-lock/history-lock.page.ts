import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isBefore, isWithinInterval } from 'date-fns';
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
  allLock:any=[];
  backupLock: any = [];
  profile = null;
  lock = [];
  lockDatas: any;
  lockShow = [];
  LenLock = 0;
  startDate: any;
  endDate: any;
  invalidSelection: boolean = false;
  constructor(
    private firestoreService: FirestoreService,
    private authSrv: AuthService,
    private router: Router,
    public firestore: AngularFirestore,
    private toastCtrl: ToastController
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
    this.firestoreService.getAllLockDatas().then((docs)=>{
      this.lockDatas = docs;
      for(let u of this.lockDatas){
        if(u.uid === this.userKey){
          console.log('masuk');
          this.lock.push(u);
        }
      }
      this.backupLock = this.lock;
      this.allLock = this.lock;
      this.lockShow = this.lock;
      this.LenLock = this.lockShow.length;
      console.log(this.lockDatas);
      console.log(this.userKey);
     }).catch(function(error) {
    });
    
  }
  loadResults() {
      
    if (!this.startDate || !this.endDate) {
      return;
    }
    if (isBefore(new Date(this.endDate), new Date(this.startDate))) {
      this.presentToastError();
      this.allLock = this.backupLock;
      this.invalidSelection = true;
    }

    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    this.allLock = this.backupLock.filter((item) => {
      return isWithinInterval(new Date(item.dateLock), {
        start: startDate,
        end: endDate,
      });
    });
    this.invalidSelection = false;
  }
  async presentToastError() {
    let toast = this.toastCtrl.create({
      message: "Invalid date.",
      duration: 2000,
      position: "bottom",
    });

    (await toast).present();
  }
}