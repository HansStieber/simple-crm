import { Component, inject } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore)
  user!: User;
  loading = false;
  userId!: string;

  async saveUser() {
    this.loading = true;
    let docRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(docRef, this.user.toJSON());
    this.loading = false;
  }

}
