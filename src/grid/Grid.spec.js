import Grid from "./Grid";
import Coordinates from "../Coordinates/Coordinates";

// utility
function arrayAreEquals(arr1, arr2) {
  if (
    arr1.every((ob1) => arr2.find((ob2) => ob2.isEqual(ob1))) &&
    arr2.every((ob2) => arr1.find((ob1) => ob1.isEqual(ob2)))
  ) {
    return true;
  }
  return false;
}

describe("Grid", () => {
  it("should create a grid", () => {
    const obstacles = [new Coordinates(0, 5), new Coordinates(0, 6)];
    const grid = new Grid(100, 100, obstacles);

    expect(grid.height).toBe(100);
    expect(grid.width).toBe(100);
    expect(arrayAreEquals(grid.obstacles, obstacles)).toBe(true);
  });

  it("should create a grid with default values (height = 10, width = 10, obstacles = [])", () => {
    const grid = new Grid();

    expect(grid.height).toBe(10);
    expect(grid.width).toBe(10);
    expect(arrayAreEquals(grid.obstacles, [])).toBe(true);
  });

  it("should get the grid height", () => {
    const grid = new Grid(10, 10, []);

    expect(grid.height).toBe(10);
  });

  it("should get the grid width", () => {
    const grid = new Grid(10, 10, []);

    expect(grid.width).toBe(10);
  });

  it("should get the grid obstacles", () => {
    const obstacles = [new Coordinates(1, 1), new Coordinates(1, 2)];
    const grid = new Grid(10, 10, obstacles);

    expect(arrayAreEquals(grid.obstacles, obstacles)).toBe(true);
  });

  it("should responds true if given coordinates correspond to an obstacle", () => {
    const obstacles = [new Coordinates(0, 5), new Coordinates(1, 6)];
    const grid = new Grid(10, 10, obstacles);

    expect(grid.isObstacle(obstacles[0])).toBe(true);
  });

  it("should responds false if given coordinates don't correspond to an obstacle", () => {
    const obstacles = [new Coordinates(0, 5), new Coordinates(1, 6)];
    const grid = new Grid(10, 10, obstacles);
    const coordinates = new Coordinates(0, 6);

    expect(grid.isObstacle(coordinates)).toBe(false);
  });

  it("should responds true if given coordinates belong to the grid", () => {
    const grid = new Grid(10, 10, []);
    const coordinates = new Coordinates(9, 9);

    expect(grid.belongsToGrid(coordinates)).toBe(true);
  });

  it("should responds false if given coordinates don't belong to the grid", () => {
    const grid = new Grid(10, 10, []);
    const coordinates = new Coordinates(10, 10);

    expect(grid.belongsToGrid(coordinates)).toBe(false);
  });

  it("should return false if two grid have different obstacles", () => {
    const grid = new Grid(10, 10, []);
    const grid2 = new Grid(10, 10, [new Coordinates(1, 2)]);

    expect(grid.compareObstacles(grid2)).toBe(false);
  });

  it("should return true if two grid are equals", () => {
    const grid = new Grid(10, 10, [new Coordinates(1, 2)]);
    const grid2 = new Grid(10, 10, [new Coordinates(1, 2)]);

    expect(grid.isEqual(grid2)).toBe(true);
  });

  it("should return false if two grid are not equals", () => {
    const grid = new Grid(10, 10, [new Coordinates(1, 2)]);
    const grid2 = new Grid(9, 10, [new Coordinates(1, 3)]);

    expect(grid.isEqual(grid2)).toBe(false);
  });

  it("should throw an error if invalid value is provided for height", () => {
    expect(() => {
      new Grid("foo", 10, []);
    }).toThrowError("Wrong type given for Height, expected integer value");
  });

  it("should throw an error if invalid value is provided for width", () => {
    expect(() => {
      new Grid(10, "bar", []);
    }).toThrowError("Wrong type given for Width, expected integer value");
  });

  it("should throw an error if negative integer is provided for height", () => {
    expect(() => {
      new Grid(-10, 10, []);
    }).toThrowError("Invalid Height, expected positive integer");
  });

  it("should throw an error if negative integer is provided for width", () => {
    expect(() => {
      new Grid(10, -10, []);
    }).toThrowError("Invalid Width, expected positive integer");
  });

  it("should throw an error if invalid coordinates are provided when to evaluate if it's an obstacle", () => {
    const grid = new Grid(10, 10, [
      new Coordinates(0, 1),
      new Coordinates(3, 3),
    ]);
    expect(() => {
      grid.isObstacle("foo");
    }).toThrowError(
      "Wrong type given for coordinates input, expected Coordinates obj"
    );
  });

  it("should throw an error if obstacles is not an array", () => {
    expect(() => {
      new Grid(10, 10, "foo");
    }).toThrowError("Wrong type given for obstacles, expected array");
  });

  it("should throw an error if obstacles is a malformed array", () => {
    const obstacles = [new Coordinates(0, 5), "foo", new Coordinates(6, 5)];
    expect(() => {
      new Grid(10, 10, obstacles);
    }).toThrowError("All obstacles must be instances of Coordinates");
  });

  it("should throw an error if invalid coordinates are provided when the grid have to establish if they are acceptable", () => {
    const obstacles = [new Coordinates(0, 5), new Coordinates(1, 6)];
    const grid = new Grid(10, 10, obstacles);
    const coordinates = "foo";

    expect(() => {
      grid.belongsToGrid(coordinates);
    }).toThrowError(
      "Wrong type given for coordinates input, expected Coordinates obj"
    );
  });

  it("should throw an error if one or more obstacles don't belong to grid", () => {
    const obstacles = [new Coordinates(11, 5), new Coordinates(12, 6)];
    expect(() => {
      new Grid(10, 10, obstacles);
    }).toThrowError("All obstacles must be contained in the provided grid");
  });
});
