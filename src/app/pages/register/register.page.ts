import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from  "@angular/router";
import { LoadingController, NavController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  imageFilePath = '';
  file: File;
  fileExtension = 'png';
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'nama': [
      { type: 'required', message: 'Nama is required.' },
    ],
    'tglLahir': [
      { type: 'required', message: 'Tanggal Lahir is required.' },
    ],
    'telepon': [
      { type: 'required', message: 'Nomor Telepon is required.' },
      { type: 'pattern', message: 'Nomor Telepon is not valid.' },
    ],
    'alamat': [
      { type: 'required', message: 'Alamat is required.' },
    ],
  };
  dataTest;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private  router:  Router,
    private firestoreService : FirestoreService,
    public loadingCtrl: LoadingController,
    public photoService: PhotoService
  ) {

   }


  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      nama: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tglLahir: new FormControl('', Validators.compose([
        Validators.required
      ])),
      telepon: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(8),
      ])),
      alamat: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async tryRegister(value) {
    // console.log(value);
    const loading = await this.loadingCtrl.create();
   
    this.authService.registerUser(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        this.uploadProfileImage(res.user.uid);
        this.firestoreService.registerUser( value.email,
          value.nama,
          value.tglLahir,
          value.telepon,
          value.alamat,
          this.fileExtension,
          res.user.uid).then(
            () => {
              loading.dismiss().then(() => {
                this.router.navigateByUrl('/index');
              });
            },
            error => {
              loading.dismiss().then(() => {
                console.error(error);
              });
            }
          );
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
        loading.dismiss().then(() => {
          console.error(err);
        });
      })
    return await loading.present();

  }
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  uploadProfileImage(uid:string){
    this.firestoreService.uploadProfileImage(this.photoService.photoBase64, this.fileExtension,uid);
  }
  getFileExtension(filename){
    return filename.split('.').pop();
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}