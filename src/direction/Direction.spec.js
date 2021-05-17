import Direction from "./Direction";

describe("Direction", () => {
  it("should create a direction", () => {
    const direction = new Direction("E");

    expect(direction.vector).toBe("E");
    expect(direction.left).toBe("N");
    expect(direction.right).toBe("S");
  });

  it("should create a direction with default values (vector = N, left = W, right = E)", () => {
    const direction = new Direction();

    expect(direction.vector).toBe("N");
    expect(direction.left).toBe("W");
    expect(direction.right).toBe("E");
  });

  it("should get vector value", () => {
    const direction = new Direction();

    expect(direction.vector).toBe("N");
  });

  it("should get left value", () => {
    const direction = new Direction();

    expect(direction.left).toBe("W");
  });

  it("should get right value", () => {
    const direction = new Direction();

    expect(direction.right).toBe("E");
  });

  it.each`
    vector | left   | right
    ${"N"} | ${"W"} | ${"E"}
    ${"E"} | ${"N"} | ${"S"}
    ${"S"} | ${"E"} | ${"W"}
    ${"W"} | ${"S"} | ${"N"}
  `(
    "should set vector = $vector, then left = $left and right = $right",
    ({ vector, left, right }) => {
      const direction = new Direction();

      direction.vector_ = vector;
      expect(direction.vector).toBe(vector);
      expect(direction.left).toBe(left);
      expect(direction.right).toBe(right);
    }
  );

  it("should compare two direction and return true if they are equal", () => {
    const direction1 = new Direction();
    const direction2 = new Direction();

    expect(direction1.isEqual(direction2)).toBe(true);
  });

  it("should compare two direction and return false if they are not equal", () => {
    const direction1 = new Direction("E");
    const direction2 = new Direction("W");

    expect(direction1.isEqual(direction2)).toBe(false);
  });

  it("should throw an error if invalid value is provided for the vector", () => {
    expect(() => {
      new Direction("foo");
    }).toThrowError("Direction must be a value among N, W, E, S");
  });
});
