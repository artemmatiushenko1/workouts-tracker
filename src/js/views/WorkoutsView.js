import AlertView from './AlertView.js';
import { AlertView as AlertViewClass } from './AlertView.js';

class WorkoutsView {
  #form = document.querySelector('.form');
  #workoutsContainer = document.querySelector('.workouts');
  #inputType = document.querySelector('.form__input--type');
  #inputDistance = document.querySelector('.form__input--distance');
  #inputDuration = document.querySelector('.form__input--duration');
  #changableInput = document.querySelector('.form__input--changable');
  #changableInputLabel = document.querySelector('.form__label--changable');
  #totalWorkoutsEl = document.querySelector('.total-workouts-value');
  #currentWorkoutType = 'running';
  #typeDependentInputs = new Map([
    ['running', { name: 'cadence', unit: 'step/min' }],
    ['cycling', { name: 'elevation', unit: 'meters' }],
  ]);
  #mapEvent;

  constructor() {
    this.#bindInputTypeChangeHandler(this.#onInputTypeChanged.bind(this));
    this.#onInputTypeChanged();
  }

  setTotalWorkoutsValue(value) {
    this.#totalWorkoutsEl.textContent = value;
  }

  showForm(mapEvent) {
    this.#form.classList.remove('hidden');
    this.#inputDistance.focus();
    this.#mapEvent = mapEvent;
  }

  hideForm() {
    this.#form.reset();
    this.#form.style.display = 'none';
    this.#form.classList.add('hidden');
    setTimeout(() => (this.#form.style.display = 'grid'), 1000);
  }

  getFormValues() {
    return {
      type: this.#inputType.value,
      values: {
        distance: this.#inputDistance.value,
        duration: this.#inputDuration.value,
        coords: [this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng],
        [this.#changableInput.name]: this.#changableInput.value,
      },
    };
  }

  #isValidFormInputs(...inputs) {
    return inputs
      .filter((input) => typeof input !== 'object')
      .every(
        (input) => Number.isFinite(parseInt(input)) && parseInt(input) > 0
      );
  }

  #bindInputTypeChangeHandler(handler) {
    this.#inputType.addEventListener('change', handler);
  }

  #onInputTypeChanged() {
    this.#currentWorkoutType = this.#inputType.value;
    const typeDependentInput = this.#typeDependentInputs.get(
      this.#currentWorkoutType
    );
    this.#changableInput.name = typeDependentInput.name;
    this.#changableInput.placeholder = typeDependentInput.unit;
    this.#changableInputLabel.textContent =
      typeDependentInput.name[0].toUpperCase() +
      typeDependentInput.name.slice(1);
  }

  renderWorkout(workout) {
    const html = this.createWorkoutTemplate(workout);
    this.#form.insertAdjacentHTML('afterend', html);
  }

  bindOnWorkoutClickHandler(handler) {
    this.#workoutsContainer.addEventListener('click', (e) => {
      const workoutEl = e.target.closest('.workout');
      if (!workoutEl || e.target.closest('.workout__delete-btn')) return;
      const workoutId = workoutEl.dataset['id'];
      handler(workoutId);
    });
  }

  bindOnWorkoutDeleteHandler(handler) {
    this.#workoutsContainer.addEventListener('click', (e) => {
      const btnDelete = e.target.closest('.workout__delete-btn');
      if (!btnDelete) return;
      const workoutEl = e.target.closest('.workout');
      const idToDelete = workoutEl.dataset['id'];
      this.#workoutsContainer.removeChild(workoutEl);
      handler(idToDelete);
    });
  }

  binOnFormSubmitHandler(handler) {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formValues = this.getFormValues();
      const inputs = Object.values(formValues.values);
      if (!this.#isValidFormInputs(...inputs)) {
        AlertView.show(
          'Make sure that you entered correct values',
          AlertViewClass.DURATION_MEDIUM
        );
        return;
      }
      handler(formValues);
    });
  }

  createWorkoutTemplate(workout) {
    return `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <button class="workout__delete-btn">
        <i class="fas fa-trash-alt"></i>
      </button>
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
        <span class="workout__value">${workout.elevation}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>`
      }`;
  }
}

export default new WorkoutsView();
