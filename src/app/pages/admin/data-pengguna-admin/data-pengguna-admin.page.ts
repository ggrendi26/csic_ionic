import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-data-pengguna-admin",
  templateUrl: "./data-pengguna-admin.page.html",
  styleUrls: ["./data-pengguna-admin.page.scss"],
})
export class DataPenggunaAdminPage implements OnInit {
  allUser: any;
  userPic: any;
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getAllDocuments().then((data) => {
      console.log(data);
      this.allUser = data;
    });
  }
}
