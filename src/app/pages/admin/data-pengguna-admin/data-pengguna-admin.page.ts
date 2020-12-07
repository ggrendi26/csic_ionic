import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FirestoreService } from "src/app/services/firestore.service";
import { isBefore, isWithinInterval } from "date-fns";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-data-pengguna-admin",
  templateUrl: "./data-pengguna-admin.page.html",
  styleUrls: ["./data-pengguna-admin.page.scss"],
})
export class DataPenggunaAdminPage implements OnInit {
  allUser: any;
  userPic: any;
  backupUser: any = [];
  filtered: any = [];
  searchNama: string = "";
  startDate;
  endDate;
  invalidSelection: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private toastCtrl: ToastController
  ) {
    this.firestoreService.getAllDocuments().then((data) => {
      this.allUser = data;
      this.backupUser = this.allUser;
      this.filtered = this.allUser;
    });
  }

  ngOnInit() {}

  onChange(event) {
    const filteration = event.target.value;
    this.allUser = this.filterItems(filteration);
    if (filteration.length === 0) {
      this.allUser = this.backupUser;
    }
  }

  filterItems(searchNama) {
    console.log(this.allUser);
    return this.allUser.filter((user) => {
      return user.nama.toLowerCase().indexOf(searchNama.toLowerCase()) > -1;
    });
  }

  loadResults() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    if (isBefore(this.endDate, this.startDate)) {
      this.presentToastError();
      this.allUser = this.backupUser;
      this.invalidSelection = true;
    }

    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    this.allUser = this.allUser.filter((item) => {
      return isWithinInterval(new Date(item.dateJoined), {
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
