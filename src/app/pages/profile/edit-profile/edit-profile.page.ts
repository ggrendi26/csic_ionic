import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from  "@angular/router";
import { LoadingController, NavController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profile = null;
  uid;
  nama= "";
  tglLahir= "";
  alamat= "";
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  imageFilePath ='';
  file: File;
  fileExtension = 'png';
  profileImageUrl;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private  router:  Router,
    private firestoreService : FirestoreService,
    public loadingCtrl: LoadingController,
    public photoService: PhotoService
  ) { }



  validation_messages = {
    'nama': [
      { type: 'required', message: 'Nama is required.' },
    ],
    'tglLahir': [
      { type: 'required', message: 'Tanggal Lahir is required.' },
    ],
    'alamat': [
      { type: 'required', message: 'Alamat is required.' },
    ],
    'profilePic': [
    ]
  };

 
  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      if(res !== null){
        this.uid = res.uid;
        this.getUserInfo();
       
      } else {
        this.uid = '';
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });
    this.validations_form = this.formBuilder.group({
      nama: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tglLahir: new FormControl('', Validators.compose([
        Validators.required
      ])),
      alamat: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

  }
 
  getUserInfo(){
    this.firestoreService.getUserInfo(this.uid).then((doc) => {
      if(doc.exists){
        this.profile = doc.data();
        this.nama = this.profile.nama;
        this.tglLahir= this.profile.tglLahir;
        this.alamat= this.profile.alamat;
        this.firestoreService.getProfileImageUrl(this.profile.profileImageUrl).subscribe((res)=>{
          this.profileImageUrl =  res;
          this.photoService.photoUrl = res;
        })
      }else{
        console.log('tidak ada document', doc)
      }
  }).catch(function (error){
    console.log('error getting document', error)
  });
  }

  async editProfile(value) {
    // console.log(value);
    const loading = await this.loadingCtrl.create();
    if(this.photoService.photoBase64 != ""){
      this.uploadProfileImage();
    }
   
    this.firestoreService.updateProfile(
      value.nama,
      value.tglLahir,
      value.alamat,
      this.fileExtension, this.uid).then(
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
      ), err => {
    console.log(err);
    this.errorMessage = err.message;
    this.successMessage = "";
  }
    return await loading.present();
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
  
  uploadProfileImage(){
    this.firestoreService.uploadProfileImage(this.photoService.photoBase64, this.fileExtension, this.uid)
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}

