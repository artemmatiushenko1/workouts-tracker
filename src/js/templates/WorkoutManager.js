import { CyclingWorkout } from './CyclingWorkout.js';
import { RunningWorkout } from './RunningWorkout.js';

export class WorkoutManager {
  workoutTypes = {
    cycling: CyclingWorkout,
    running: RunningWorkout,
  };

  createWorkout(props) {
    return new this.workoutTypes[props.type](props);
  }
}

export default new WorkoutManager();
