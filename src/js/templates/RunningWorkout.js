import { Workout } from './Workout.js';

export class RunningWorkout extends Workout {
  type = 'running';

  constructor(props) {
    super(props);
    this.cadence = props.cadence;
    this.calcPace();
    this.setDesciption();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
