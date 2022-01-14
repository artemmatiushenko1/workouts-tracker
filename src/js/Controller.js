/* eslint-disable no-unused-vars */
import MapView from './views/MapView.js';
import WorkoutsView from './views/WorkoutsView.js';
import AlertView from './views/AlertView.js';
import { AlertView as AlertViewClass } from './views/AlertView.js';
import { Model } from './Model.js';

class Controller {
  #model = new Model();

  constructor() {
    this.#model
      .getPosition()
      .then((position) => {
        MapView.loadMap(position, this.onMapClickHandler);
        MapView.bindOnMapClickHandler(this.onMapClickHandler);
        this.initSavedWorkouts();
      })
      .catch(this.onGetLocationFail);
    WorkoutsView.setTotalWorkoutsValue(this.#model.workoutsCount);
    WorkoutsView.binOnFormSubmitHandler(this.onFormSubmitHandler.bind(this));
    WorkoutsView.bindOnWorkoutClickHandler(
      this.onWorkoutClickHandler.bind(this)
    );
    WorkoutsView.bindOnWorkoutDeleteHandler(
      this.onWorkoutDeleteHandler.bind(this)
    );
  }

  onMapClickHandler(mapEvent) {
    WorkoutsView.showForm(mapEvent);
  }

  onFormSubmitHandler(data) {
    const workout = this.#model.addWorkout(data);
    WorkoutsView.hideForm();
    WorkoutsView.renderWorkout(workout);
    WorkoutsView.setTotalWorkoutsValue(this.#model.workoutsCount);
    MapView.renderWorkoutMarker(workout);
  }

  onWorkoutClickHandler(workoutId) {
    const workout = this.#model.findWorkoutById(workoutId);
    MapView.moveToWorkout(workout);
  }

  onWorkoutDeleteHandler(idToDelete) {
    this.#model.deleteWorkoutById(idToDelete);
    WorkoutsView.setTotalWorkoutsValue(this.#model.workoutsCount);
    MapView.removeMarker(idToDelete);
  }

  initSavedWorkouts() {
    const workouts = this.#model.workouts;
    workouts.forEach((workout) => {
      WorkoutsView.renderWorkout(workout);
      MapView.renderWorkoutMarker(workout);
    });
  }

  onGetLocationFail() {
    AlertView.show(
      'You should turn on location in order to have the app working',
      AlertViewClass.DURATION_LONG
    );
  }
}

const controller = new Controller();
