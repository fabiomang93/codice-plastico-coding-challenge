import { validateCoordinate } from "./validators";

export default class Coordinates {
  x;
  y;

  constructor(x = 0, y = 0) {
    this.x_ = x;
    this.y_ = y;
  }

  set x_(x) {
    validateCoordinate(x, "x");
    this.x = x;
  }

  set y_(y) {
    validateCoordinate(y, "y");
    this.y = y;
  }

  isEqual(obj) {
    if (this.x === obj.x && this.y === obj.y) return true;
    return false;
  }
}
