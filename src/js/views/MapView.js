export class MapView {
  map;

  load(position) {
    const { latitude, longitude } = position.coords;

    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  onClick(handler) {
    handler();
    //on click logic
  }

  renderMarkers(workouts) {
    //markers renderinf logic
  }
}
