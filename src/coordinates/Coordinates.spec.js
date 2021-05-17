import Coordinates from "./Coordinates";

describe("Coordinates", () => {
  it("should create coordinates", () => {
    const coordinates = new Coordinates(10, 10);

    expect(coordinates.x).toBe(10);
    expect(coordinates.y).toBe(10);
  });

  it("should create coordinates with default values (0x0)", () => {
    const coordinates = new Coordinates();

    expect(coordinates.x).toBe(0);
    expect(coordinates.y).toBe(0);
  });

  it("should get x coordinate", () => {
    const coordinates = new Coordinates(10, 0);

    expect(coordinates.x).toBe(10);
  });

  it("should get y coordinate", () => {
    const coordinates = new Coordinates(0, 10);

    expect(coordinates.y).toBe(10);
  });

  it("should set x coordinate", () => {
    const coordinates = new Coordinates(0, 0);

    expect((coordinates.x = 10)).toBe(10);
  });

  it("should set y coordinate", () => {
    const coordinates = new Coordinates(0, 0);

    expect((coordinates.y = 10)).toBe(10);
  });

  it("should compare two coordinates and return true if they are equal", () => {
    const coordinates1 = new Coordinates(10, 10);
    const coordinates2 = new Coordinates(10, 10);

    expect(coordinates1.isEqual(coordinates2)).toBe(true);
  });

  it("should compare two coordinates and return false if they aren't equal", () => {
    const coordinates1 = new Coordinates(10, 10);
    const coordinates2 = new Coordinates(12, 10);

    expect(coordinates1.isEqual(coordinates2)).toBe(false);
  });

  it("should throw an error if a wrong value is provided for set coordinate x", () => {
    const coordinates = new Coordinates(0, 0);

    expect(() => (coordinates.x_ = "foo")).toThrowError(
      "Wrong type for x coordinate, expected integer value"
    );
  });

  it("should throw an error if a wrong value is provided for set coordinate y", () => {
    const coordinates = new Coordinates(0, 0);

    expect(() => (coordinates.y_ = "foo")).toThrowError(
      "Wrong type for y coordinate, expected integer value"
    );
  });

  it("should throw an error if a negative integer is provided for set coordinate x", () => {
    const coordinates = new Coordinates(0, 0);

    expect(() => (coordinates.x_ = -5)).toThrowError(
      "Invalid x coordinate, expected positive integer"
    );
  });

  it("should throw an error if a negative integer is provided for set coordinate y", () => {
    const coordinates = new Coordinates(0, 0);

    expect(() => (coordinates.y_ = -5)).toThrowError(
      "Invalid y coordinate, expected positive integer"
    );
  });
});
