import Coordinates from "../coordinates/Coordinates";

export function validateSize(value, size) {
  if (!Number.isInteger(value))
    throw new TypeError(`Wrong type given for ${size}, expected integer value`);
  if (value < 0) throw new Error(`Invalid ${size}, expected positive integer`);
  return value;
}

export function validateObstacles(obstacles, width, height) {
  if (!Array.isArray(obstacles))
    throw new TypeError(`Wrong type given for obstacles, expected array`);

  obstacles.forEach((obstacle) => {
    if (obstacle instanceof Coordinates) {
      if (obstacle.x >= width || obstacle.y >= height) {
        throw new Error("All obstacles must be contained in the provided grid");
      }
      return;
    }
    throw new TypeError("All obstacles must be instances of Coordinates");
  });
  return obstacles;
}

export function validateInputCoordinates(coordinates) {
  if (coordinates instanceof Coordinates) return;
  throw new TypeError(
    "Wrong type given for coordinates input, expected Coordinates obj"
  );
}
