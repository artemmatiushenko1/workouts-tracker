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

  async getPosition() {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return position;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  findWorkoutById(id) {
    return this.#workouts.find((workout) => workout.id === id);
  }

  deleteWorkoutById(id) {
    const indexToDelete = this.#workouts.findIndex((value) => value.id === id);
    this.#workouts.splice(indexToDelete, 1);
    this.#setLocalStorage();
  }

  get workouts() {
    return this.#workouts;
  }

  get workoutsCount() {
    return this.#workouts.length;
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
