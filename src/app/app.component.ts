import { Component } from "@angular/core";

import { NavController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { FirestoreService } from "./services/firestore.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  userKey: string;
  userName: string;
  userRole: string;
  profile = null;
  profileImageUrl = "../assets/img/user.png";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authSrv: AuthService,
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
  }

  ionViewWillEnter(){
    this.firestoreService
    .getProfileImageUrlPromise(this.profile.profileImageUrl)
    .then((res) => {
      console.log("masuk sini")
      this.profileImageUrl = res + "&date=" + Date.now().toString();
      // console.log(res)
    }).catch((err) => {
      
    });
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authSrv.userDetails().subscribe(
      (res) => {
        if (res !== null) {
          this.userKey = res.uid;

          // get user details
          this.firestoreService
            .getUserInfoObserve(this.userKey)
            .subscribe((doc) => {
              if (doc) {
                // console.log(doc.data());
                this.profile = doc;
                this.userName = this.profile.nama;
                this.userRole = this.profile.role;
                this.profileImageUrl = "../assets/img/user.png";

                this.firestoreService
                  .getProfileImageUrlPromise(this.profile.profileImageUrl)
                  .then((res) => {
                    console.log("masuk sini")
                    this.profileImageUrl = res + "&date=" + Date.now().toString();
                    // console.log(res)
                  }).catch((err) => {
                    
                  });
              } else {
                console.log("error getting document", doc);
              }
            })
        } else {
          this.userKey = "";
        }
      },
      (err) => {
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    );
  }

  LogoutUser() {
    this.authSrv
      .logoutUser()
      .then((res) => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
