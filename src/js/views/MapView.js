class MapView {
  map;

  loadMap(position) {
    const { latitude, longitude } = position.coords;
    this.map = new L.Map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  bindOnMapClickHandler(handler) {
    this.map.on('click', handler);
  }

  renderWorkoutMarker({ coords, type, description }) {
    const marker = L.marker(coords);
    marker
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${type}-popup`,
        })
      )
      .setPopupContent(`${type === 'running' ? '🏃‍♂️' : '🚴‍♂️'} ${description}`)
      .openPopup();
  }

  moveToWorkout(workout) {
    this.map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

export default new MapView();
