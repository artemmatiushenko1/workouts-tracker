import Workout from './Workout.js';

class CyclingWorkout extends Workout {
  type = 'cycling';

  constructor(props) {
    super(props);
    this.elevation = props.elevation;
    this.#calcSpeed();
    this.setDesciption();
  }

  #calcSpeed() {
    const distanceInt = parseInt(this.distance);
    const durationInt = parseInt(this.duration);
    this.speed = distanceInt / (durationInt / 60);
    return this.speed;
  }
}

export default CyclingWorkout;
