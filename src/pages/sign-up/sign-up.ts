import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/auth';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  email: string;
  pass: string;

  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.auth = firebase.auth();
  }

  signUp() {
    //console.log(this.email, this.pass);
    this.auth.createUserWithEmailAndPassword(this.email, this.pass)
      .then(data => {
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          title: "Success",
          subTitle: "User registered",
          buttons: ["Ok"]
        });
        alert.present();
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: error.message,
          buttons: ["Ok"]
        });
        alert.present();
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
