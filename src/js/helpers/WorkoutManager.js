import { CyclingWorkout, RunningWorkout } from '../models/index.js';

class WorkoutManager {
  #workoutTypes = {
    cycling: CyclingWorkout,
    running: RunningWorkout,
  };

  createWorkout(props) {
    return new this.#workoutTypes[props.type](props.values);
  }
}

export default new WorkoutManager();
