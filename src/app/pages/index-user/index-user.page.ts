import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.page.html',
  styleUrls: ['./index-user.page.scss'],
})
export class IndexUserPage implements OnInit {

  userEmail: string;

  constructor(
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      if(res !== null){
        this.userEmail = res.email;
      } else {
        this.router.navigateByUrl('login');
        // console.log('kosong');
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });
  }

}
