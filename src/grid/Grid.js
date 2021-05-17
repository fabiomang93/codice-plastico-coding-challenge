import {
  validateSize,
  validateObstacles,
  validateInputCoordinates,
} from "./validators";
export default class Grid {
  #height;
  #width;
  #obstacles;

  constructor(height = 10, width = 10, obstacles = []) {
    this.#height = validateSize(height, "Height");
    this.#width = validateSize(width, "Width");
    this.#obstacles = validateObstacles(obstacles, height, width);
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get obstacles() {
    return this.#obstacles;
  }

  #check(coordinates) {
    return this.#obstacles.some((obstacleCoordinates) =>
      obstacleCoordinates.isEqual(coordinates)
    );
  }

  isObstacle(coordinates) {
    validateInputCoordinates(coordinates);
    return this.#check(coordinates);
  }

  belongsToGrid(coordinates) {
    validateInputCoordinates(coordinates);
    if (coordinates.x < this.#width || coordinates.y < this.#height) {
      return true;
    }
    return false;
  }

  compareObstacles(grid) {
    if (
      this.#obstacles.every((ob1) =>
        grid.obstacles.find((ob2) => ob2.isEqual(ob1))
      ) &&
      grid.obstacles.every((ob2) =>
        this.#obstacles.find((ob1) => ob1.isEqual(ob2))
      )
    ) {
      return true;
    }
    return false;
  }

  isEqual(grid) {
    if (
      this.#height === grid.height &&
      this.#width === grid.width &&
      this.compareObstacles(grid)
    )
      return true;
    return false;
  }
}
