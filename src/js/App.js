import { MapView } from './views/MapView.js';

class App {
  constructor() {
    this.getPosition();
  }

  getPosition() {
    const fail = function () {
      alert('Can`t find your position!');
    };

    const map = new MapView();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(map.load.bind(this), fail);
    }
  }
}

const app = new App();
