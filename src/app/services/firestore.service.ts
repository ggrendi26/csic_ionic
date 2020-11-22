import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/firestore';
import {format} from "date-fns";
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore,private storage: AngularFireStorage) {}

  registerUser(
    email: string,
    nama: string,
    tglLahir: string,
    telepon: string,
    alamat: string,
    extension,
    UID:string
  ) {
    var virtualAccount  = "0885" + telepon+ "002";
    var profileImageUrl = UID + "." + extension;
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
      role,
      profileImageUrl
    });
   }
   capitalizeWords(text){
    return text.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})
  };
  getUserInfo(UID:string){
    return this.firestore.doc(`users/${UID}`).ref.get()
  }
  updateProfile(
    nama: string,
    tglLahir: string,
    telepon: string,
    alamat: string,
    extension,
    UID:string
  ) {
    nama  = this.capitalizeWords(nama);
    tglLahir = format(new Date(tglLahir), "yyyy-MM-dd");
    if(extension){
      var profileImageUrl = UID + "." + extension;
    }

    var docRef = this.firestore.doc(`users/${UID}`);
    return docRef.ref.get().then((doc) => {
      if (doc.exists) {
        //change image if extension exist
        if(extension){
          docRef.update({
            nama,
            tglLahir,
            telepon,
            alamat,
            profileImageUrl
          });
        }else{
          docRef.update({
            nama,
            tglLahir,
            telepon,
            alamat,
          });
        }
        
      }
    }).catch(function(error) {
    });
   }
   uploadProfileImage(profileImage:File, extension, uid : string){
      const file =profileImage;
      const filePath = 'profileImage/' + uid + "." + extension;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
   }
   getProfileImageUrl(uid){
    try {
      return       this.storage.ref(`profileImage/${uid}`).getDownloadURL().toPromise()
    } catch (error) {
      console.log(error);
    } 
   }
}
