import MapView from './views/MapView.js';
import WorkoutsView from './views/WorkoutsView.js';
import { Model } from './Model.js';

class Controller {
  model;

  constructor() {
    this.model = new Model();
    this.model.getPosition().then((position) => {
      MapView.loadMap(position, this.onMapClickHandler);
      MapView.bindOnMapClickHandler(this.onMapClickHandler);
      this.initSavedWorkouts();
    }, this.onGetLocationFail);
    WorkoutsView.setTotalWorkoutsValue(this.model.workoutsCount);
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
    WorkoutsView.setTotalWorkoutsValue(this.model.workoutsCount);
    MapView.renderWorkoutMarker(workout);
  }

  onWorkoutClickHandler(workoutId) {
    const workout = this.model.findWorkoutById(workoutId);
    MapView.moveToWorkout(workout);
  }

  initSavedWorkouts() {
    const workouts = this.model.workouts;
    workouts.forEach((workout) => {
      WorkoutsView.renderWorkout(workout);
      MapView.renderWorkoutMarker(workout);
    });
  }

  onGetLocationFail(e) {
    console.log('You should turn on location ' + e.message);
  }
}

const controller = new Controller();
