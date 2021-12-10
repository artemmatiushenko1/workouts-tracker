import { Workout } from './Workout';

export class CyclingWorkout extends Workout {
  type = 'cycling';

  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.setDesctiption();
    this.#calcSpeed();
  }

  #calcSpeed() {
    this.speed = this.getDistance() / this.getDuration();
  }
}
