class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(props) {
    this.distance = props.distance;
    this.duration = props.duration;
    this.coords = props.coords;
  }

  setDesciption() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

export default Workout;
