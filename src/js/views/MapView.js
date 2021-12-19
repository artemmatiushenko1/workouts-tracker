class MapView {
  #map;
  #markers = [];

  loadMap(position) {
    const { latitude, longitude } = position.coords;
    this.#map = new L.Map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
  }

  bindOnMapClickHandler(handler) {
    this.#map.on('click', handler);
  }

  renderWorkoutMarker({ coords, type, description, id }) {
    const marker = L.marker(coords);
    marker.id = id;
    marker
      .addTo(this.#map)
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
    this.#markers.push(marker);
  }

  removeMarker(id) {
    const indexToRemove = this.#markers.findIndex((marker) => marker.id === id);
    const markerToRemove = this.#markers[indexToRemove];
    this.#map.removeLayer(markerToRemove);
  }

  moveToWorkout(workout) {
    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

export default new MapView();
