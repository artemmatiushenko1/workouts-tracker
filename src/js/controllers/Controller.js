import { WorkoutsView, MapView, AlertView } from '../views/index.js';
import { DURATION_LONG } from '../constants/index.js';
import Model from '../store/Model.js';

class Controller {
  #model = new Model();

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
      DURATION_LONG
    );
  }

  init() {
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
}

export default Controller;
