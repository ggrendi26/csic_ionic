import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
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
  constructor(
    private firestoreService: FirestoreService,
    private authSrv: AuthService,
    private router: Router,
    public firestore: AngularFirestore,
    private paymentSrv: PaymentService
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
        
        this.outShow = this.out;

      this.LenOut = this.outShow.length;
      });
      
    }

}
