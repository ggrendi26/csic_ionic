import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-home-admin",
  templateUrl: "./home-admin.page.html",
  styleUrls: ["./home-admin.page.scss"],
})
export class HomeAdminPage implements OnInit {
  allUser: any;
  allLock: any;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getAllDocuments().then((data) => {
      this.allUser = data;
    });

    this.firestoreService.getAllLockDatas().then((data) => {
      this.allLock = data;
    });
  }
}
