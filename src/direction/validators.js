import { directions } from "./Direction";

export function validateVector(vector) {
  if (!directions.includes(vector)) {
    throw new Error("Direction must be a value among N, W, E, S");
  }
  return vector;
}
