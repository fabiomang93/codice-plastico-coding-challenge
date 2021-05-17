import Coordinates from "../coordinates/Coordinates";
import Direction from "../direction/Direction";
import Grid from "../grid/Grid";

import {
  validateGrid,
  validatePosition,
  validateOrientation,
  validateCommands,
} from "./validators";

export const MOVE_FORWARD_X = "MOVE_FORWARD_X";
export const MOVE_FORWARD_Y = "MOVE_FORWARD_Y";
export const MOVE_BACK_X = "MOVE_BACK_X";
export const MOVE_BACK_Y = "MOVE_BACK_Y";

export const commands = ["F", "B", "L", "R"];

export default class Rover {
  #grid;
  #position;
  #orientation;

  constructor(
    grid = new Grid(10, 10, []),
    position = new Coordinates(0, 0),
    orientation = new Direction("N")
  ) {
    this.#grid = validateGrid(grid);
    this.#position = validatePosition(grid, position);
    this.#orientation = validateOrientation(orientation);
  }

  get grid() {
    return this.#grid;
  }

  get position() {
    return this.#position;
  }

  get orientation() {
    return this.#orientation;
  }

  #setOrientation(vector) {
    this.#orientation.vector_ = vector;
  }

  _setPosition(nextPosition) {
    this.#position.x_ = nextPosition.x;
    this.#position.y_ = nextPosition.y;
  }

  #isObstacle(position) {
    return this.#grid.isObstacle(position);
  }

  #direction(command) {
    if (
      (command === "F" && this.#orientation.vector === "N") ||
      (command === "B" && this.#orientation.vector === "S")
    )
      return MOVE_FORWARD_Y;

    if (
      (command === "F" && this.#orientation.vector === "E") ||
      (command === "B" && this.#orientation.vector === "W")
    )
      return MOVE_FORWARD_X;
    if (
      (command === "F" && this.#orientation.vector === "W") ||
      (command === "B" && this.#orientation.vector === "E")
    )
      return MOVE_BACK_X;
    if (
      (command === "F" && this.#orientation.vector === "S") ||
      (command === "B" && this.#orientation.vector === "N")
    )
      return MOVE_BACK_Y;
  }

  #abort(nextPosition) {
    throw new Error(
      `Obstacle detected in position x:${nextPosition.x} y:${nextPosition.y}: commands sequence aborted.`
    );
  }

  #nextPosition(command) {
    const nextPosition = new Coordinates(this.#position.x, this.#position.y);
    const direction = this.#direction(command);

    if (direction === MOVE_FORWARD_Y)
      nextPosition.y_ = (this.#position.y + 1) % this.#grid.height;

    if (direction === MOVE_FORWARD_X)
      nextPosition.x_ = (this.#position.x + 1) % this.#grid.width;

    if (direction === MOVE_BACK_X)
      this.#position.x > 0
        ? (nextPosition.x_ = this.#position.x - 1)
        : (nextPosition.x_ = this.#grid.width - 1);

    if (direction === MOVE_BACK_Y)
      this.#position.y > 0
        ? (nextPosition.y_ = this.#position.y - 1)
        : (nextPosition.y_ = this.#grid.width - 1);

    return nextPosition;
  }

  #move(nextPosition) {
    this._setPosition(nextPosition);
  }

  #moveOrAbort(command) {
    const nextPosition = this.#nextPosition(command);
    if (this.#isObstacle(nextPosition)) this.#abort(nextPosition);
    this.#move(nextPosition);
  }

  #turn(command) {
    if (command === "L") this.#setOrientation(this.#orientation.left);
    if (command === "R") this.#setOrientation(this.#orientation.right);
  }

  #exec(command) {
    if (command === "R" || command === "L") this.#turn(command);
    if (command === "F" || command === "B") this.#moveOrAbort(command);
  }

  execCommands(commands) {
    validateCommands(commands);
    commands.forEach((command) => this.#exec(command));
  }
}
