import { Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, doc, docData, DocumentData, Firestore, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User();
  users$!: Observable<DocumentData[]>;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async paramMap => {
      this.userId = paramMap.get('id') || '{}';
      let coll = collection(this.firestore, 'users');
      this.users$ = collectionData(coll)
      this.users$.subscribe(() => {
        this.getUser();
      })
    })
  }


  async getUser() {
    let docRef = doc(this.firestore, 'users', this.userId);
    let docSnap = await getDoc(docRef);
    let user = await docSnap.data();
    this.user = new User(user);
    console.log(this.user)
  }


  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
