import {Page} from 'ionic-angular';
import {Modal, NavController, ViewController} from 'ionic-angular';
import {ImageDetail} from '../imageDetail/imageDetail';
import {AddProduct} from '../addProduct/addProduct';

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

  showImageDetail(imageURL) {
    let modal = Modal.create(ImageDetail, {imageURL:imageURL});
    console.log("modal=");
    console.log(modal);
    this.nav.present(modal)
  }
}
