import { Workout } from './Workout';

export class RunningWorkout extends Workout {
  type = 'running';

  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.setDesctiption();
    this.#calcPace();
  }

  #calcPace() {
    this.pace = this.getDuration() / this.getDistance();
  }
}
