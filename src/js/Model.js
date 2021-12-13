import WorkoutManager from './templates/WorkoutManager.js';

export class Model {
  #workouts = [];

  constructor() {
    this.#getLocalStorage();
  }

  addWorkout(workoutData) {
    const newWorkout = WorkoutManager.createWorkout(workoutData);
    this.#workouts.push(newWorkout);
    this.#setLocalStorage();
    return newWorkout;
  }

  async getPosition(onFail) {
    try {
      const position = await this.#getLocationPromise();
      return position;
    } catch (e) {
      onFail(e.message);
    }
  }

  #getLocationPromise() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  }

  findWorkoutById(id) {
    return this.#workouts.find((workout) => workout.id === id);
  }

  deleteWorkout() {
    //delete workout logic
  }

  getWorkouts() {
    return this.#workouts;
  }

  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
  }
}
