import { CyclingWorkout } from './templates/CyclingWorkout.js';
import { RunningWorkout } from './templates/RunningWorkout.js';

export class Model {
  #workouts = [];

  addWorkout(workoutData) {
    const { coords, distance, duration, elevation, cadence } = workoutData;
    let newWorkout;

    if (workoutData.type === 'running') {
      newWorkout = new RunningWorkout(coords, distance, duration, cadence);
    }

    if (workoutData.type === 'cycling') {
      newWorkout = new CyclingWorkout(coords, distance, duration, elevation);
    }

    this.#workouts.push(newWorkout);
    this.#setLocalStorage();
    return newWorkout;
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
}
