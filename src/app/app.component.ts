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
  profileImageUrl = "";

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
            .getUserInfo(this.userKey)
            .then((doc) => {
              if (doc.exists) {
                // console.log(doc.data());
                this.profile = doc.data();
                this.userName = this.profile.nama;
                this.userRole = this.profile.role;
                // console.log(this.userName);
                this.firestoreService
                  .getProfileImageUrl(this.profile.profileImageUrl)
                  .then((res) => {
                    this.profileImageUrl = res;
                    // console.log(res)
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                console.log("error getting document", doc);
              }
            })
            .catch(function (error) {
              console.log("error getting document", error);
            });
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
        // console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
