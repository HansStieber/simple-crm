import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {  collection, collectionData } from '@angular/fire/firestore';
import { doc, getDoc } from "firebase/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);
  items$!: Observable<any[]>;

  constructor() {
  }

  async ngOnInit() {
    let docRef = doc(this.firestore, 'users', 'xnvxC8x4b18PRhF8dr8q')
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    //this.items$ = collectionData(aCollection);
    console.log(data)
    //this.items$.subscribe(() => {
    //  this.getCorrectDocument();
    //})
  }

  
  async getCorrectDocument() {
    let docRef = doc(this.firestore, 'users', 'xnvxC8x4b18PRhF8dr8q');
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    console.log(this.items$);
  }
}
