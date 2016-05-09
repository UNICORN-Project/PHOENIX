import {NgZone} from 'angular2/core';
import {RouteConfig, Location} from 'angular2/router';
import {App, IonicApp, Platform, ActionSheet, MenuController} from 'ionic-angular';
import {Page, Config, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import * as helpers from './directives/helpers';

// Change the import if you want to change the first page, for example:
// import { ImagePage as rootPage } from './pages/cards/cards';
import {Main} from './pages/main/main';
import {Page2} from './pages/page2/page2';


@App({
  templateUrl: './build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

export class AppDelegate {
  isProductionMode: boolean = true;
  rootPage: any = Main;
  nextPage: any;
  currentPlatform: string = "ios";
  pages = [
    { title: 'Main', component: Main },
  ];

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private config: Config,
    private menu: MenuController,
    private location: Location,
    private zone: NgZone) {

    this.menu.enable(true);
  }

  ngAfterContentInit() {
    // production-only code
    // production is false unless viewed on the docs
    // http://ionicframework.com/docs/v2/components/
    // ------------------------------------------------------------

    if (this.platform.query("production") === "true") {
      this.isProductionMode = true;

      // Platform is ios by default
      // only change it if android or windows
      if (this.platform.is("android")) {
        this.currentPlatform = "android";
      } else if (this.platform.is("windows")) {
        this.currentPlatform = "windows";
      }

      if (helpers.hasScrollbar() === true) {
        setTimeout(function() {
          var body = document.getElementsByTagName('body')[0];
          body.className = body.className + ' has-scrollbar';
        }, 500);
      }

      window.parent.postMessage(this.currentPlatform, "*");
      window.addEventListener('message', (e) => {
        this.zone.run(() => {
          if (e.data) {
            var data;
            try {
              data = JSON.parse(e.data);
            } catch (e) {
              console.error(e);
            }

            if (data.hash) {
              this.nextPage = helpers.getPageFor(data.hash.replace('#', ''));
              if (data.hash !== 'menus') {
                this.menu.enable(false);
              }
            } else {
              this.nextPage = this.rootPage;
            }

            let nav = this.app.getComponent('nav');
            helpers.debounce(nav.setRoot(this.nextPage), 60, false);
          }
        });
      });
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    helpers.debounce(nav.setRoot(page.component), 60, false);
  }
}
