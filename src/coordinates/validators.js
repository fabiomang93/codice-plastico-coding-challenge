export function validateCoordinate(value, coordinate) {
  if (!Number.isInteger(value))
    throw new TypeError(
      `Wrong type for ${coordinate} coordinate, expected integer value`
    );
  if (value < 0)
    throw new Error(
      `Invalid ${coordinate} coordinate, expected positive integer`
    );
  return value;
}
