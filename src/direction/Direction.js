import { validateVector } from "./validators";

export const directions = ["N", "E", "S", "W"];

export default class Direction {
  vector;
  #left;
  #right;

  constructor(vector = "N") {
    this.vector_ = vector;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  set vector_(vector) {
    validateVector(vector);
    this.#initialize(directions.indexOf(vector));
  }

  #initialize(vectorIndex) {
    this.vector = directions[vectorIndex];

    if (vectorIndex > 0) this.#left = directions[vectorIndex - 1];
    else this.#left = directions[directions.length - 1];

    if (vectorIndex !== directions.length - 1)
      this.#right = directions[vectorIndex + 1];
    else this.#right = directions[0];
  }

  isEqual(direction) {
    if (this.vector === direction.vector) return true;
    return false;
  }
}
