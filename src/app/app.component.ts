import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

export const config = {
    apiKey: "AIzaSyDHYzGlE5PrVO-MGvpKuNVkFowDEMgdrRA",
    authDomain: "prueba6c-46710.firebaseapp.com",
    databaseURL: "https://prueba6c-46710.firebaseio.com",
    projectId: "prueba6c-46710",
    storageBucket: "prueba6c-46710.appspot.com",
    messagingSenderId: "81924048475",
    appId: "1:81924048475:web:a1c1cd22d27d7d92"
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

