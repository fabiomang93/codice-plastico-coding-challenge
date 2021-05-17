import Coordinates from "../coordinates/Coordinates";
import Direction from "../direction/Direction";
import Grid from "../grid/Grid";
import { commands } from "./Rover";

export function validateGrid(grid) {
  if (grid instanceof Grid) return grid;
  throw new TypeError("Wrong type given for grid, expected Grid obj");
}

export function validatePosition(grid, coordinates) {
  if (coordinates instanceof Coordinates) {
    if (!grid.belongsToGrid(coordinates)) {
      throw new Error("Given position coordinates dont belong to grid");
    }
    if (grid.isObstacle(coordinates)) {
      throw new Error("It is not possible to place the rover on an obstacle");
    }
    return coordinates;
  }
  throw new TypeError(
    "Wrong type given for coordinates, expected Coordinates obj"
  );
}

export function validateOrientation(orientation) {
  if (orientation instanceof Direction) return orientation;
  throw new TypeError("Expected instance of Direction");
}

export function validateCommand(command) {
  if (commands.includes(command)) return command;
  throw new Error("Unrecognized command. Commands available: R, L, B, F");
}

export function validateCommands(commands) {
  if (Array.isArray(commands))
    commands.forEach((command) => validateCommand(command));
  else throw new Error("Commands must be an array");
}
