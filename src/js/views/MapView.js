export class MapView {
  map;
  form = document.querySelector('.form');

  constructor() {}

  load(position) {
    const { latitude, longitude } = position.coords;

    this.map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.map.on('click', this.toogleForm);
  }

  onClick() {
    //on click logic
  }

  toogleForm() {
    console.log('fg');
  }

  renderMarkers(workouts) {
    //markers renderinf logic
  }
}
