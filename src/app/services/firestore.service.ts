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
  ) {
    nama  = this.capitalizeWords(nama);
    tglLahir = format(new Date(tglLahir), "yyyy-MM-dd");
    const id = this.firestore.createId();
    return this.firestore.doc(`users/${id}`).set({
      email,
      nama,
      tglLahir,
      telepon,
      alamat,
    });
   }
   capitalizeWords(text){
    return text.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})
  };
}