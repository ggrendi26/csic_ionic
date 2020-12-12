import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any;
  adminStatus:boolean = false;
  uid;
  constructor(
    private afAuth: AngularFireAuth,
    private firestoreService:FirestoreService
  ) { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }
 
  isAuthenticated(){
    if( this.afAuth.authState !== null){
      this.afAuth.user.subscribe(res => {
        if(res !== null){
          this.uid = res.uid;
          // this.isAdmin();
        } else {
          this.uid = '';
        }
      }, err => {
        console.log(err);
      });
    }
   
    return this.afAuth.authState !== null;
  }
  // isAdmin(){
  //   this.firestoreService.isAdmin(this.uid).subscribe( (res:any)=>{
  //     console.log(res.role.toLowerCase())
  //     if(res.role.toLowerCase() == "admin"){
  //       this.firestoreService.adminStatus = true;
  //       this.adminStatus = true;
  //     }else{
  //       this.adminStatus = false;
  //     }
  //   })
  // }
}