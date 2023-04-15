import { Component, inject } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore)
  user!: User;
  userId!: string;
  loading = false;
  birthDate!: Date;


  async saveUser() {
    this.loading = true;
    let docRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(docRef, this.user.toJSON());
    this.loading = false;
  }
}
