import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '../services/firestore.service';

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
  constructor(
    private firestoreService: FirestoreService,
    public firestore: AngularFirestore
    ) { }

  ngOnInit() {
    this.firestoreService.getAllDocuments().then((data) => {
      console.log(data);
      this.user = data;

    });
  }

  getDataHistoryTopup(){
    var docRef = this.firestore.collection(`logTopUp`, (ref) =>
    ref.where("role", "==", "Admin"));
    docRef.get().forEach(
      (doc) => {
       doc.forEach((data) =>{
          this.datas.push(data.data());
        });
      })
      .then(()=>{
        // console.log(datas);
      })
      .catch(function (error) {});
  }

}
