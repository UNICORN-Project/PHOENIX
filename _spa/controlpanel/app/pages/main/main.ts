import {Page, Config, Events} from 'ionic-angular';
import {Modal, NavController} from 'ionic-angular'
import {AddProduct} from '../addProduct/addProduct';

@Page({
  templateUrl: 'build/pages/main/main.html',
})

export class Main {
  hasList: boolean = false;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  showAdd (){
    let modal = Modal.create(AddProduct);
    this.nav.present(modal)
  }

  swhichProp (){
    this.hasList = true;
  }

  isList (){
    return this.hasList;
  }
}
