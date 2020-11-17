import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { KategoriService } from 'src/app/services/kategori.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
})
export class KategoriPage implements OnInit {
  userEmail: string;
  userKey: string;
  kategori: any;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private kategoriSrv: KategoriService
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      if(res !== null){
        this.userEmail = res.email;
        this.userKey = res.uid;
        // console.log(this.userKey);
      } else {
        this.router.navigateByUrl('login');
        // console.log('kosong');
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });

    this.kategoriSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
      )
    ).subscribe(data => {
      this.kategori = data;
      // console.log(data);
    })
  }
}
