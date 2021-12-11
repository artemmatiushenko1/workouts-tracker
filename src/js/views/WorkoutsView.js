export class WorkoutsView {
  #workoutsContainer = document.querySelector('.form');

  renderWorkout(workout) {
    const html = this.createWorkoutTemplate(workout);
    this.#workoutsContainer.insertAdjacentHTML('afterend', html);
  }

  bindOnWorkoutClickHandler(handler) {
    this.#workoutsContainer.addEventListener('click', (e) => {
      // logic from _moveToPopup(e)
      handler();
    });
  }

  createWorkoutTemplate(workout) {
    return `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">
        ${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'}
        </span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      ${
        workout.type === 'running'
          ? `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
      </li>`
          : `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>`
      }`;
  }
}
