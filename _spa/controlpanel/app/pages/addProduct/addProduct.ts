import {Page} from 'ionic-angular';
import {Modal, NavController, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/addProduct/addProduct.html'
})

export class AddProduct {
  constructor(nav: NavController, viewCtrl: ViewController) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  next() {
  }
}
