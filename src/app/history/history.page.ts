import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { isBefore, isWithinInterval } from 'date-fns';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  userEmail: string;
  userKey: string;
  datas=[];
  user: any;
  jumlahSaldo: any;
  backupTopup: any = [];
  in = [];
  inDatas: any;
  inShow = [];
  LenIn = 0;
  startDate: any;
  endDate: any;
  invalidSelection: boolean = false;
  constructor(
    private firestoreService: FirestoreService,
    private authSrv: AuthService,
    private router: Router,
    public firestore: AngularFirestore,
    private toastCtrl: ToastController
    ) { 
      
    }

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
      this.firestoreService.getAllTopUpDatas().then((docs)=>{
        this.inDatas = docs;
        for(let u of this.inDatas){
          if(u.uid === this.userKey){
            console.log('masuk');
            this.in.push(u);
            
          }
        }
        
        this.inShow = this.in;
        this.LenIn = this.inShow.length;
        this.backupTopup = this.in;

        console.log(this.inDatas);
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
        this.in = this.backupTopup;
        this.invalidSelection = true;
      }
  
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      this.in = this.backupTopup.filter((item) => {
        return isWithinInterval(new Date(item.tanggalTopup), {
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
