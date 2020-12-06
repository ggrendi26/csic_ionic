import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FirestoreService } from "src/app/services/firestore.service";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-data-pengguna-admin",
  templateUrl: "./data-pengguna-admin.page.html",
  styleUrls: ["./data-pengguna-admin.page.scss"],
})
export class DataPenggunaAdminPage implements OnInit {
  allUser: any;
  userPic: any;
  backupUser: any = [];
  searchNama: string = "";

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getAllDocuments().then((data) => {
      this.allUser = data;
      this.backupUser = this.allUser;
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
}
