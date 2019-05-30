import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/firestore';

export const config = {
  apiKey: "AIzaSyD-lNLc-JLk4O7R5YavhRFUpqAYWLeHjpM",
  authDomain: "prueba6c-3e843.firebaseapp.com",
  databaseURL: "https://prueba6c-3e843.firebaseio.com",
  projectId: "prueba6c-3e843",
  storageBucket: "prueba6c-3e843.appspot.com",
  messagingSenderId: "3273605461"

};
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  db: firebase.firestore.Firestore;
  nombre: string;
  cargo: string;
  foto: string;

  user: firebase.User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  add() {
    let disco = {
      nombre: this.nombre,
      cargo: this.cargo,
      foto: this.foto,
      user: this.user.uid
    }

    console.log(JSON.stringify(disco));
    this.addDocument('Memexico', disco);
  }

  addDocument(collection: string, obj: any) {
    this.db.collection(collection).add(obj)
      .then((res: any) => {
        console.log("agregado")
        let alert = this.alertCtrl.create({
          title: "Éxito",
          subTitle: "Se agregó el politico",
          buttons: ["Ok"]
        });
        alert.present();
        this.navCtrl.pop();
      })
      .catch((error: any) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "No se pudo agregar el politico",
          buttons: ["Ok"]
        });
        alert.present();
      });
  }

}
