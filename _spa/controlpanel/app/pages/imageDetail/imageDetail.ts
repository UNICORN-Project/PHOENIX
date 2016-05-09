import {Page} from 'ionic-angular';
import {Modal, NavController, ViewController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/imageDetail/imageDetail.html',
})

export class ImageDetail {
  imageURL = '';
  constructor(nav: NavController, params: NavParams, viewCtrl: ViewController) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    console.log('imageURL=', params.get('imageURL'));
    this.imageURL = params.get('imageURL');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
