import { Workout } from './Workout.js';

export class RunningWorkout extends Workout {
  type = 'running';

  constructor(props) {
    super(props);
    this.cadence = props.cadence;
    this.#calcPace();
    this.setDesciption();
  }

  #calcPace() {
    const durationInt = parseInt(this.duration);
    const distanceInt = parseInt(this.distance);
    this.pace = durationInt / distanceInt;
    return this.pace;
  }
}
