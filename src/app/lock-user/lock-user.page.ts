import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { FirestoreService } from "../services/firestore.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-lock-user",
  templateUrl: "./lock-user.page.html",
  styleUrls: ["./lock-user.page.scss"],
})
export class LockUserPage implements OnInit {
  uid;
  createLockForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";
  validation_messages = {
    dateLock: [{ type: "required", message: "End date is required." }],
    saldoLock: [{ type: "required", message: "Balance is required." }],
  };

  private nama: any;
  private user: any;
  private currDate: String = new Date().toISOString().substr(0, 10);
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    public firestore: AngularFireAuth
  ) {}

  ngOnInit() {
    this.authService.userDetails().subscribe(
      (res) => {
        if (res !== null) {
          this.uid = res.uid;
        } else {
          this.uid = "";
        }
      },
      (err) => {
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    );
    this.createLockForm = this.formBuilder.group({
      dateLock: new FormControl("", Validators.compose([Validators.required])),
      saldoLock: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  async requestLock() {
    // const loading = await this.loadingCtrl.create();
  }
}
