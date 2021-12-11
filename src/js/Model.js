export class Model {
  #workouts = [];

  addWorkout() {
    //add workout logiv
  }

  deleteWorkout() {
    //delete workout logic
  }

  getWorkouts() {
    return this.#workouts;
  }

  // _setLocalStorage() {
  //   localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  // }

  // _getLocalStorage() {
  //   const data = JSON.parse(localStorage.getItem('workouts'));
  //   console.log(data);

  //   if (!data) return;
  //   workouts = data;

  //   workouts.forEach((workout) => {
  //     this._renderWokout(workout);
  //   });
  // }
}
