import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import "firebase/firestore";
import { format } from "date-fns";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private currDate: string = new Date().toISOString().substr(0, 10);
  adminStatus:boolean = false;
  imageUrl = ""
  constructor(
    public firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  registerUser(
    email: string,
    nama: string,
    tglLahir: string,
    telepon: string,
    alamat: string,
    extension,
    UID: string
  ) {
    var virtualAccount = "0885" + telepon + "002";
    var profileImageUrl = UID + "." + extension;
    var saldo = 0;
    var dateJoined = this.currDate;
    var role = "User";
    nama = this.capitalizeWords(nama);
    tglLahir = format(new Date(tglLahir), "yyyy-MM-dd");
    return this.firestore.doc(`users/${UID}`).set({
      email,
      nama,
      tglLahir,
      telepon,
      alamat,
      virtualAccount,
      saldo,
      dateJoined,
      role,
      profileImageUrl,
    });
  }
  capitalizeWords(text) {
    return text.replace(/(?:^|\s)\S/g, (res) => {
      return res.toUpperCase();
    });
  }
  getUserInfo(UID: string) {
    return this.firestore.doc(`users/${UID}`).ref.get();
  }

  getUserInfoObserve(UID: string) {
    return this.firestore.doc(`users/${UID}`).valueChanges();
  }
  updateProfile(
    nama: string,
    tglLahir: string,
    alamat: string,
    extension,
    UID: string
  ) {
    nama = this.capitalizeWords(nama);
    tglLahir = format(new Date(tglLahir), "yyyy-MM-dd");
    if (extension) {
      var profileImageUrl = UID + "." + extension;
    }

    var docRef = this.firestore.doc(`users/${UID}`);
    return docRef.ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          //change image if extension exist
          if (extension) {
            docRef.update({
              nama,
              tglLahir,
              alamat,
              profileImageUrl,
            });
          } else {
            docRef.update({
              nama,
              tglLahir,
              alamat,
            });
          }
        }
      })
      .catch(function (error) {});
  }

  updateProfileImageDoc(UID:string, extension){
    var profileImageUrl = UID + "." + extension;
    var docRef = this.firestore.doc(`users/${UID}`);
    return docRef.ref
      .get()
      .then((doc) => {
        if (doc.exists) {
            docRef.update({
              profileImageUrl,
            });
        }
      })
      .catch(function (error) {});
  }
  uploadProfileImage(profileImage: string, extension, uid: string) {
    let firestore: AngularFirestore;
    const file = profileImage;
    const filePath = "profileImage/" + uid + "." + extension;
    const ref = this.storage.ref(filePath);
    this.imageUrl = profileImage;
    const task = ref.putString(profileImage, 'data_url', {contentType: "image/png"}).then(function(snapshot) {
      //  snapshot.ref.getDownloadURL().then((data)=>{
      //     this.imageUrl = data;
      //  })
      });
  }
  getProfileImageUrl(uid) {
    try {
      return this.storage
        .ref(`profileImage/${uid}`)
        .getDownloadURL()
    } catch (error) {
      console.log(error);
    }
  }

  getProfileImageUrlPromise(uid) {
    try {
      return this.storage
        .ref(`profileImage/${uid}`)
        .getDownloadURL().toPromise()
    } catch (error) {
      console.log(error);
    }
  }
  // getSaldoUser(uid) {
  //   try {
  //     return this.storage
  //       .ref(`saldo/${uid}`)
  //       .getDownloadURL()
  //       .toPromise();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  updateUserCredits(currCredits: number, UID) {
    var docRef = this.firestore.doc(`users/${UID}`);
    return docRef.ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          docRef.update({
            saldo: currCredits,
          });
        }
      })
      .catch(function (error) {});
  }

  addPanduanTopup(namaPanduan: string, deskripsiPanduan: string) {
    return this.firestore.collection("panduanTopUp").add({
      namaPanduan: namaPanduan,
      deskripsiPanduan: deskripsiPanduan,
    });
  }

  getPanduanTopup() {
    var docRef = this.firestore.collection(`panduanTopUp`);
    let datas;
    return docRef.ref
      .get()
      .then((doc) => {
        let items = [];
        doc.docs.map((a) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...(a.data() as {}) });
        });
        datas = items;
        console.log(datas);
        return datas;
      })
      .catch(function (error) {});
  }

  createLockForm(
    dateLock: string,
    saldoLock: string,
    catatanLock: string,
    dateStart: string,
    uid: string
  ) {
    // dateLock = format(new Date(dateLock), "yyyy-MM-dd");
    return this.firestore.collection(`lock`).add({
      dateLock: dateLock.toString().substr(0, 10),
      saldoLock: saldoLock,
      catatanLock: catatanLock,
      dateStart: dateStart,
      uid: uid,
    });
  }

  getAllDocuments() {
    var docRef = this.firestore.collection(`users`);
    let datas;
    return docRef.ref
      .get()
      .then((doc) => {
        let items = [];
        doc.docs.map((a) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...(a.data() as {}) });
        });
        datas = items;
        // console.log(datas);
        return datas;
      })
      .catch(function (error) {});
  }

  getAllLockDatas() {
    var docRef = this.firestore.collection(`lock`);
    let datas;
    return docRef.ref
      .get()
      .then((doc) => {
        let items = [];
        doc.docs.map((a) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...(a.data() as {}) });
        });
        datas = items;
        // console.log(datas);
        return datas;
      })
      .catch(function (error) {});
  }

  getAllTopUpDatas() {
    var docRef = this.firestore.collection(`LogTopUp`);
    let datas;
    return docRef.ref
      .get()
      .then((doc) => {
        let items = [];
        doc.docs.map((a) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...(a.data() as {}) });
        });
        datas = items;
        // console.log(datas);
        return datas;
      })
      .catch(function (error) {});
  }
  //
  isAdmin(UID: string) {
    let datas = [];
    var docRef = this.firestore.doc(`users/${UID}`);
    return docRef.valueChanges()
      
  }
  // isAdmin(UID:string) {
  //   let datas=[];
  //   var docRef = this.firestore.collection(`users`, (ref) =>
  //   ref.where("role", "==", "Admin"));
  //   return docRef.get().forEach(
  //     (doc) => {
  //      doc.forEach((data) =>{
  //         datas.push(data.data());
  //       });
  //     })
  //     .then(()=>{
  //       return datas;
  //       console.log(datas);
  //     })
  //     .catch(function (error) {});
  // }
}
