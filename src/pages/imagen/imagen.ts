import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SyncAsync } from '@angular/compiler/src/util';
import *  as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

/**
 * Generated class for the ImagenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {
  imagen: any;
  comment: string;
  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user: firebase.User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
    this.imagen = this.navParams.get("imagen");
    this.storage = firebase.storage();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }

  subirImagen(){
    let imagen ={
      comentario: this.comment,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      url: "",
      user: this.user.uid
    };

    let loading = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loading.present();

    this.db.collection('imagenes').add(imagen)
    .then(ref =>{
      let nombre = ref.id;
      let uploadTask = this.storage.ref('imagenes/' + nombre + '.jpeg').putString(this.imagen, 'data_url');

      uploadTask.then(exito => {
        loading.dismiss();
        let url = exito.downloadURL;
        ref.update({url: url});
        this.navCtrl.pop();
      })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    });  
  }

}
