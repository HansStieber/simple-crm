import { Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers: User[] = [];
  firestore: Firestore = inject(Firestore)

  constructor(public dialog: MatDialog) {
  }


  async ngOnInit(): Promise<void> {
    let coll = collection(this.firestore, 'users');
    collectionData(coll, {idField: 'id'}).subscribe((changes: any) => {
      this.allUsers = changes;
    })
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
