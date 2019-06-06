import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SyncAsync } from '@angular/compiler/src/util';
import { Geolocation } from '@ionic-native/geolocation';
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
  tipo="";
  ancho1=0;
  ancho2=0;
  imagen: any;
  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user: firebase.User;
  lat=0;
  long=0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation) {
    this.imagen = this.navParams.get("imagen");
    this.storage = firebase.storage();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.longitude);
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }

  subirImagen(){
    

    let imagen ={
      tipo: this.tipo,
      anchot: this.ancho1,
      anchoc: this.ancho2,
      latitude: this.lat,
      longitude: this.long,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      url: "",
      user: this.user.uid
    };

    let loading = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loading.present();

    this.db.collection('arboles').add(imagen)
    .then(ref =>{
      let nombre = ref.id;
      let uploadTask = this.storage.ref('arboles/' + nombre + '.jpeg').putString(this.imagen, 'data_url');

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
