import MapView from './views/MapView.js';
import WorkoutsView from './views/WorkoutsView.js';
import { Model } from './Model.js';

class Controller {
  model;

  constructor(model) {
    this.model = model;
    this.getPosition();
    WorkoutsView.binOnFormSubmitHandler((data) => {
      this.onFormSubmitHandler(data);
    });
    WorkoutsView.bindOnWorkoutClickHandler((workoutId) => {
      this.onWorkoutClickHandler(workoutId);
    });
  }

  getPosition() {
    const fail = function () {
      alert('Please give a permission to access your location');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        MapView.loadMap(position, this.onMapClickHandler);
      }, fail);
    }
  }

  onMapClickHandler(mapEvent) {
    WorkoutsView.showForm(mapEvent);
  }

  onFormSubmitHandler(data) {
    WorkoutsView.hideForm();
    const workout = this.model.addWorkout(data);
    WorkoutsView.renderWorkout(workout);
    MapView.renderWorkoutMarker(workout);
  }

  onWorkoutClickHandler(workoutId) {
    const workout = this.model.findWorkoutById(workoutId);
    MapView.moveToWorkout(workout);
  }
}

const model = new Model();
const controller = new Controller(model);
