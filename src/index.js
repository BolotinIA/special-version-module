import css from '!!to-string-loader!css-loader!sass-loader!./assets/styles/lib.scss';
import Application from './components/app/app';
import FontSizeService from './components/FontSizeService/fontSizeService';
import FontFamilyService from './components/FontFamilyService/fontFamilyService';
import ColorSchemeService from './components/ColorSchemeService/colorSchemeService';
import FontIntervalService from './components/FontIntervalService/fontIntervalService';
import FontKerningService from './components/FontKerningService/fontKerningService';
import ImagesService from './components/ImagesService/imagesService';
import PluginSpeechSystem from './components/TextReadService/textReadService';
import { languageSettings, servicesList } from './constants/defaults';

export default class SpecialVersion {
  constructor(services = servicesList, lng = languageSettings, customCss = css){
    this.app = null;
    this.services = [
      FontSizeService,
      FontFamilyService,
      ColorSchemeService,
      FontIntervalService,
      FontKerningService,
      ImagesService,
      PluginSpeechSystem
    ];
    this.connectServiceClasses(services);
    this.init(customCss, services, lng);
  }

  init(specialVerCss, serviceList, lngSettings) {
    this.app = new Application(specialVerCss, serviceList, lngSettings);
  };

  connectServiceClasses(settings) {
    for(let i = 0; i < settings.length; i++) {
        const item = settings[i];
        item.service = this.getClassByName(item.serviceName);
    }
  }

  getClassByName(name) {
    switch(name) {
      case 'FontSizeService': {
        return this.services[0];
      }
      case 'FontFamilyService':  {
        return this.services[1];
      }
      case 'ColorSchemeService':  {
        return this.services[2];
      }
      case 'FontIntervalService':  {
        return this.services[3];
      }
      case 'FontKerningService':  {
        return this.services[4];
      }
      case 'ImagesService':  {
        return this.services[5];
      }
      case 'PluginSpeechSystem':  {
        return this.services[6];
      }
      default: {
        return null
      }
    }
  }

  start() {
    this.app.run();
  }

  stop() {
    if (this.app.isReady()) {
      this.app.reset();
    }
  }

  reload() {
    if (this.app.isReady()) {
      this.stop();
      this.start();
    }
  }
}
