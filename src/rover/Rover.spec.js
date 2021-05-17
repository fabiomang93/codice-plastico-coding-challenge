import Rover from "./Rover";
import Grid from "../grid/Grid";
import Coordinates from "../coordinates/Coordinates";
import Direction from "../direction/Direction";

describe("Rover", () => {
  it("should create a rover", () => {
    const grid = new Grid(10, 10, [new Coordinates(0, 2)]);
    const position = new Coordinates(0, 1);
    const orientation = new Direction("N");

    const rover = new Rover(grid, position, orientation);

    expect(rover.grid.isEqual(grid)).toBe(true);
    expect(rover.position.isEqual(position)).toBe(true);
    expect(rover.orientation).toEqual(orientation);
  });

  it("should create a rover with default values (grid = 10x10, position = 0x0, direction = N)", () => {
    const grid = new Grid(10, 10);
    const position = new Coordinates(0, 0);
    const orientation = new Direction("N");

    const rover = new Rover();

    expect(rover.grid.isEqual(grid)).toBe(true);
    expect(rover.position.isEqual(position)).toBe(true);
    expect(rover.orientation).toEqual(orientation);
  });

  it("should get the grid", () => {
    const grid = new Grid(10, 10);
    const rover = new Rover();

    expect(rover.grid.isEqual(grid)).toBe(true);
  });

  it("should get the rover position", () => {
    const position = new Coordinates(0, 0);
    const rover = new Rover();

    expect(rover.position.isEqual(position)).toBe(true);
  });

  it("should get the rover orientation", () => {
    const orientation = new Direction("N");
    const rover = new Rover();

    expect(rover.orientation.isEqual(orientation)).toBe(true);
  });

  it.each`
    command | prevOrientation | nextOrientation
    ${"L"}  | ${"N"}          | ${"W"}
    ${"L"}  | ${"E"}          | ${"N"}
    ${"L"}  | ${"W"}          | ${"S"}
    ${"L"}  | ${"S"}          | ${"E"}
    ${"R"}  | ${"N"}          | ${"E"}
    ${"R"}  | ${"E"}          | ${"S"}
    ${"R"}  | ${"S"}          | ${"W"}
    ${"R"}  | ${"W"}          | ${"N"}
  `(
    "should set orientation = $nextOrientation, after receive turn $command command, when orientation was $prevOrientation",
    ({ command, prevOrientation, nextOrientation }) => {
      const grid = new Grid(10, 10, []);
      const position = new Coordinates(0, 0);
      const orientation = new Direction(prevOrientation);
      const commands = [command];

      const newOrientation = new Direction(nextOrientation);

      const rover = new Rover(grid, position, orientation);

      rover.execCommands(commands);

      expect(rover.position.isEqual(position)).toBe(true);
      expect(rover.orientation.isEqual(newOrientation)).toBe(true);
    }
  );

  describe("should correctly implement wrapping edge, when the rover move forward or backward along y and x coordinate, grid is 5x5 and starting position is 2x2.", () => {
    it.each`
      commands           | initialOrientation | finalX | finalY
      ${["F", "F", "F"]} | ${"N"}             | ${2}   | ${0}
      ${["F", "F", "F"]} | ${"E"}             | ${0}   | ${2}
      ${["F", "F", "F"]} | ${"W"}             | ${4}   | ${2}
      ${["F", "F", "F"]} | ${"S"}             | ${2}   | ${4}
      ${["B", "B", "B"]} | ${"S"}             | ${2}   | ${0}
      ${["B", "B", "B"]} | ${"W"}             | ${0}   | ${2}
      ${["B", "B", "B"]} | ${"E"}             | ${4}   | ${2}
      ${["B", "B", "B"]} | ${"N"}             | ${2}   | ${4}
    `(
      "when commands are $commands, orientation is $initialOrientation, final position will be $finalX x $finalY",
      ({ commands, initialOrientation, finalX, finalY }) => {
        const grid = new Grid(5, 5, []);
        const position = new Coordinates(2, 2);
        const orientation = new Direction(initialOrientation);

        const rover = new Rover(grid, position, orientation);
        const finalPosition = new Coordinates(finalX, finalY);

        rover.execCommands(commands);

        expect(rover.position.isEqual(finalPosition)).toBe(true);
        expect(rover.orientation.isEqual(orientation)).toBe(true);
      }
    );
  });

  it('should arrive to position 0x2, when starting position was 2x0, orientation = N, grid = 5x5 and given commands are ["F", "F", "L","F","F","R","F","B"]', () => {
    const grid = new Grid(5, 5, []);
    const position = new Coordinates(2, 0);
    const orientation = new Direction("N");

    const commands = ["F", "F", "L", "F", "F", "R", "F", "B"];
    const finalPosition = new Coordinates(0, 2);

    const rover = new Rover(grid, position, orientation);
    const spySetPosition = jest.spyOn(rover, "_setPosition");

    rover.execCommands(commands);

    expect(spySetPosition).toHaveBeenNthCalledWith(1, new Coordinates(2, 1));
    expect(spySetPosition).toHaveBeenNthCalledWith(2, new Coordinates(2, 2));
    expect(spySetPosition).toHaveBeenNthCalledWith(3, new Coordinates(1, 2));
    expect(spySetPosition).toHaveBeenNthCalledWith(4, new Coordinates(0, 2));
    expect(spySetPosition).toHaveBeenNthCalledWith(5, new Coordinates(0, 3));
    expect(spySetPosition).toHaveBeenNthCalledWith(6, new Coordinates(0, 2));

    expect(rover.position.isEqual(finalPosition)).toBe(true);
  });

  it("should throw an error if no valid grid is provided", () => {
    const grid = "foo";
    const position = new Coordinates(0, 1);
    const direction = new Direction("N");

    expect(() => {
      new Rover(grid, position, direction);
    }).toThrowError("Wrong type given for grid, expected Grid obj");
  });

  it("should throw an error if no valid orientation is provided", () => {
    const grid = new Grid(10, 10);
    const position = new Coordinates(0, 1);
    const direction = "foo";

    expect(() => {
      new Rover(grid, position, direction);
    }).toThrowError("Expected instance of Direction");
  });

  it("should throw an error if no valid position is provided", () => {
    const grid = new Grid(10, 10);
    const position = "foo";
    const direction = new Direction("E");

    expect(() => {
      new Rover(grid, position, direction);
    }).toThrowError(
      "Wrong type given for coordinates, expected Coordinates obj"
    );
  });

  it("should throw an error if the provided position doesn't belong to the grid", () => {
    const grid = new Grid(10, 10);
    const position = new Coordinates(11, 11);
    const direction = new Direction("N");

    expect(() => {
      new Rover(grid, position, direction);
    }).toThrowError("Given position coordinates dont belong to grid");
  });

  it("should throw an error if the provided position is an obstacle", () => {
    const grid = new Grid(10, 10, [new Coordinates(1, 1)]);
    const position = new Coordinates(1, 1);
    const direction = new Direction("N");

    expect(() => {
      new Rover(grid, position, direction);
    }).toThrowError("It is not possible to place the rover on an obstacle");
  });

  it("should throw an error if an array of commands is not provided", () => {
    const rover = new Rover();
    const commands = {};

    expect(() => rover.execCommands(commands)).toThrowError(
      "Commands must be an array"
    );
  });

  it("should throw an error if an invalid command is provided", () => {
    const rover = new Rover();
    const commands = ["L", "foo", "M", "L"];

    expect(() => rover.execCommands(commands)).toThrowError(
      "Unrecognized command. Commands available: R, L, B, F"
    );
  });

  it("should throw an error if a sequence of commands leads to an obstacle", () => {
    const grid = new Grid(10, 10, [new Coordinates(1, 2)]);
    const position = new Coordinates(0, 0);
    const orientation = new Direction("N");

    const rover = new Rover(grid, position, orientation);
    const commands = ["F", "F", "R", "F"];

    expect(() => rover.execCommands(commands)).toThrowError(
      `Obstacle detected in position x:1 y:2: commands sequence aborted.`
    );
    expect(rover.position.x).toBe(0);
    expect(rover.position.y).toBe(2);
  });
});
