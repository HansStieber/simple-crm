import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.class';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, getDoc } from "firebase/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore)
  items$!: Observable<any[]>;

  constructor() {
  }

  ngOnInit(): void {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
    console.log(this.items$)
  }

  async getCorrectDocument() {
    let docRef = doc(this.firestore, 'users');
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    console.log(data);
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.items$)
  }
}
