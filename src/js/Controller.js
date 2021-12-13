import MapView from './views/MapView.js';
import WorkoutsView from './views/WorkoutsView.js';
import { Model } from './Model.js';

class Controller {
  model;

  constructor() {
    this.model = new Model();
    this.model.getPosition(this.onGetLocationFail).then((position) => {
      MapView.loadMap(position, this.onMapClickHandler);
      MapView.bindOnMapClickHandler(this.onMapClickHandler);
      this.initSavedWorkouts();
    });
    WorkoutsView.binOnFormSubmitHandler(this.onFormSubmitHandler.bind(this));
    WorkoutsView.bindOnWorkoutClickHandler(
      this.onWorkoutClickHandler.bind(this)
    );
  }

  onMapClickHandler(mapEvent) {
    WorkoutsView.showForm(mapEvent);
  }

  onFormSubmitHandler(data) {
    const workout = this.model.addWorkout(data);
    WorkoutsView.hideForm();
    WorkoutsView.renderWorkout(workout);
    MapView.renderWorkoutMarker(workout);
  }

  onWorkoutClickHandler(workoutId) {
    const workout = this.model.findWorkoutById(workoutId);
    MapView.moveToWorkout(workout);
  }

  initSavedWorkouts() {
    const workouts = this.model.getWorkouts();
    workouts.forEach((workout) => {
      WorkoutsView.renderWorkout(workout);
      MapView.renderWorkoutMarker(workout);
    });
  }

  onGetLocationFail(e) {
    console.log('You should turn on location ' + e);
  }
}

const controller = new Controller();
