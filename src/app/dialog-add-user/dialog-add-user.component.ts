import { Component } from '@angular/core';
import { User } from '../models/user.class';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore)
  user = new User();
  birthDate!: Date;
  users: CollectionReference;
  loading: boolean = false;

  constructor() {
    this.users = collection(this.firestore, 'users');
  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    await addDoc(this.users, this.user.toJSON());
    this.loading = false;
  }
}
