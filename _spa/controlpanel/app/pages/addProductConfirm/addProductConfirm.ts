import {Page} from 'ionic-angular';
import {Modal, NavController, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/addProductConfirm/addProductConfirm.html'
})

export class AddProductConfirm {
  constructor(nav: NavController, viewCtrl: ViewController) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
