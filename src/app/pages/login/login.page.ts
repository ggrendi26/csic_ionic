import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  constructor(private authService: AuthService, private loadingCtrl:LoadingController  , private router: Router, private formBuilder: FormBuilder, private firestore:FirestoreService) { }

  ngOnInit() {
    this.firestore.adminStatus = false;
    this.authService.userDetails().subscribe(res => {
      if(res === null){}
      else {
        this.firestore.isAdmin(res.uid).subscribe( (res:any)=>{
          if(res.role.toLowerCase() == "admin"){
            this.firestore.adminStatus = true;
            this.authService.adminStatus = true;
            this.router.navigateByUrl('/home-admin');
          }else{
            this.authService.adminStatus = false;
            this.router.navigateByUrl('/index');
          }
        })
      } 
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  async loginUser(value){
    const loading = await this.loadingCtrl.create({
      spinner: null,
      message: 'Verifying ...',
    });
    await loading.present();
    this.authService.loginUser(value)
      .then(res => {
        this.firestore.isAdmin(res.user.uid).subscribe( (res:any)=>{
          this.errorMessage = "";
          if(res.role.toLowerCase() == "admin"){
            this.firestore.adminStatus = true;
            this.authService.adminStatus = true;
            this.router.navigateByUrl('/home-admin');
          }else{
            this.router.navigateByUrl('/index');
            this.authService.adminStatus = false;
          }
          this.loadingCtrl.dismiss()
        })
      }, err => {
        this.errorMessage = err.message;
        this.loadingCtrl.dismiss()
      });
    this.validations_form.reset();

  }
  goToRegisterPage(){
    this.router.navigateByUrl('/register');
  }
}
