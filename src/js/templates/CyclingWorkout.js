import { Workout } from './Workout.js';

export class CyclingWorkout extends Workout {
  type = 'cycling';

  constructor(props) {
    super(props);
    this.elevationGain = props.elevationGain;
    this.#calcSpeed();
    this.setDesciption();
  }

  #calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
