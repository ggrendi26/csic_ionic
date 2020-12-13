import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isBefore, isWithinInterval } from 'date-fns';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-history-pay',
  templateUrl: './history-pay.page.html',
  styleUrls: ['./history-pay.page.scss'],
})
export class HistoryPayPage implements OnInit {
  userEmail: string;
  userKey: string;
  datas=[];
  user: any;
  jumlahSaldo: any;
  backupPay: any = [];
  out = [];
  outDatas: any;
  outShow = [];
  LenOut = 0;
  startDate: any;
  endDate: any;
  allPayment: any;
  invalidSelection: boolean = false;
  constructor(
    private firestoreService: FirestoreService,
    private authSrv: AuthService,
    private router: Router,
    public firestore: AngularFirestore,
    private paymentSrv: PaymentService,
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
      this.backupPay =this.out;
      this.outShow = this.out;
      this.allPayment =this.out;
      this.LenOut = this.outShow.length;
      });
      
    }
    loadResults() {
      
      if (!this.startDate || !this.endDate) {
        return;
      }
      if (isBefore(new Date(this.endDate), new Date(this.startDate))) {
        this.presentToastError();
        this.allPayment = this.backupPay;
        this.invalidSelection = true;
      }
  
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      this.allPayment = this.backupPay.filter((item) => {
        return isWithinInterval(new Date(item.paymentdate), {
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
