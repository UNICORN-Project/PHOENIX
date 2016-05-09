import {Page} from 'ionic-angular';
import {Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {ImageDetail} from '../imageDetail/imageDetail';
import {AddProduct} from '../addProduct/addProduct';

@Page({
  templateUrl: 'build/pages/addProductConfirm/addProductConfirm.html'
})

export class AddProductConfirm {
  rootVC;

  constructor(nav: NavController, params: NavParams, viewCtrl: ViewController) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    this.rootVC = params.get('rootVC');
  }

  close() {
    this.rootVC.viewCtrl.dismiss();
    this.rootVC.viewCtrl.dismiss();
  }

  select(itemID) {
    console.log("itemID=");
    console.log(itemID);
  }

  showImageDetail(imageURL) {
    let modal = Modal.create(ImageDetail, {imageURL:imageURL});
    console.log("modal=");
    console.log(modal);
    this.nav.present(modal)
  }
}
