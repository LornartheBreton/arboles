import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/auth';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  pass: string;
  homePage = HomePage;
  sU = SignUpPage;

  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.auth = firebase.auth();
  }

  login() {
    console.log(this.email, this.pass);

    this.auth.signInWithEmailAndPassword(this.email, this.pass)
      .then(data => {
        console.log(JSON.stringify(data));
        this.navCtrl.setRoot(this.homePage);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: error.message,
          buttons: ["Ok"]
        });
        alert.present();
      });
  }

  signUp() {
    this.navCtrl.push(this.sU);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
