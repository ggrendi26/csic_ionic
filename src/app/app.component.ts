import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userKey: string; 
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authSrv: AuthService,
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

    this.authSrv.userDetails().subscribe(res => {
      if(res !== null){
        this.userKey = res.uid;
      } else {
        this.userKey = '';
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });
  }

  LogoutUser(){
    this.authSrv.logoutUser().then(res => {
      // console.log(res);
      this.navCtrl.navigateBack('');
    }).catch(error => {
      console.log(error);
    });
  }
}
