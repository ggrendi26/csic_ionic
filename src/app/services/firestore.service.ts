import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import {format} from "date-fns";
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}

  registerUser(
    email: string,
    nama: string,
    tglLahir: string,
    telepon: string,
    alamat: string,
    UID:string
  ) {
    var virtualAccount  = "0885" + telepon+ "002";
    var saldo = 0;
    var role = "User";
    nama  = this.capitalizeWords(nama);
    tglLahir = format(new Date(tglLahir), "yyyy-MM-dd");
    return this.firestore.doc(`users/${UID}`).set({
      email,
      nama,
      tglLahir,
      telepon,
      alamat,
      virtualAccount,
      saldo,
      role
    });
   }
   capitalizeWords(text){
    return text.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})
  };
  getUserInfo(UID:string){
    return this.firestore.doc(`users/${UID}`).ref.get()
  }
}