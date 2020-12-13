import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "src/app/services/firestore.service";
import { isBefore, isWithinInterval } from "date-fns";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-log-lock-admin",
  templateUrl: "./log-lock-admin.page.html",
  styleUrls: ["./log-lock-admin.page.scss"],
})
export class LogLockAdminPage implements OnInit {
  allLock: any;
  backupLock: any;
  startDate;
  endDate;
  invalidSelection: boolean = false;
  constructor(
    private firestoreService: FirestoreService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.firestoreService
      .getAllLockDatas()
      .then((docs) => {
        this.allLock = docs;
        this.backupLock = this.allLock;
      })
      .catch(function (error) {});
  }
  loadResults() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    if (isBefore(new Date(this.endDate), new Date(this.startDate))) {
      this.presentToastError();
      this.allLock = this.backupLock;
      this.invalidSelection = true;
    }

    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    this.allLock = this.backupLock.filter((item) => {
      return isWithinInterval(new Date(item.dateLock), {
        start: startDate,
        end: endDate,
      });
    });
    this.invalidSelection = false;
  }
  async presentToastError() {
    let toast = this.toastCtrl.create({
      message: "Invalid date.",
      duration: 2000,
      position: "bottom",
    });

    (await toast).present();
  }
}
