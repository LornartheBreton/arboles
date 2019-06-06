import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagenPage } from '../imagen/imagen';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imagen = ImagenPage;
  login = LoginPage;
  user: firebase.User;
  db: firebase.firestore.Firestore;

  items = [];

  constructor(public navCtrl: NavController,
    public camera: Camera, 
    public toastCtrl: ToastController) {

    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();

    this.db.collection('arboles')
      .onSnapshot(query => {
        this.items = [];
        query.forEach(imagen => {
          if (imagen.data().user == this.user.uid) {
            this.items.push(imagen.data());
          }
        });
      });

  }

  openCamera() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then(imagen => {
        this.navCtrl.push(this.imagen, { imagen: 'data:image/jpeg;base64,' + imagen })
      }, error => {
        console.log(JSON.stringify(error));
      });
  }

  logOut() {
    firebase.auth().signOut()
      .then(data => {
        const toast = this.toastCtrl.create({
          message: "Logged out successfully",
          duration: 3000,
          position: "top"
        });
        toast.present();
        this.navCtrl.setRoot(this.login);
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: "Error. Please try again later",
          duration: 3000,
          position: "top"
        });
      });
  }


}