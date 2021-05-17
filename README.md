### Codice Plastico Coding Challenge

A coding challenge to assest development skills

## Getting Started

Clone repository:

```
git@github.com:fabiomangano/codice-plastico-coding-challenge.git
```

### Prerequisites

To run the project you need [node](https://nodejs.org/it/).

## Excecute Test:

```
cd ./codice-plastico-coding-challenge
nvm use
npm i
npm test
```

## Api

Create new rover with default parameter:

```
// grid = (10, 10, [])
// position = new Coordinates(0, 0)
// orientation = new Direction("N")

const marsRover = new Rover()
```

Create a new rover by specifying parameters:

```
const obstacles = [new Coordinates(1, 2), new Coordinates(2, 2)]
const mars = new Grid(5, 5, obstacles)
const position = new Coordinates(1, 2)
const orientation = new Direction("W")

const marsRover = new Rover(mars, position, orientation)
```

Move rover around the grid passing commands:

```
// ...

const commands = ["R", "F", "F", "B", "L", "R"]

const marsRover = new Rover(mars, position, orientation)
marsRover.execCommands(commands)

console.log(rover.position)

```

## Constraints:

Coordinates:

- Both x and y coordinates must be positive integer

Direction:

- Direction accepts a value among: "N", "W", "E", "S"

Grid:

- Both x and y size start from 0.
- Obstacles must be an array of Coordinates or empty array.
- Width and Height of grid must be positive integer (0 is not accepted)
- Obstacle coordinates have to belong to the grid

Rover:

- Commands must be an array of commands (for example ["F", "L", "R", "B"])) or empty array
- Is not possibile to place a rover on a obstacle or in a point that doesn't belong to the provided grid
- Implement warpping edge
- Abort next commands and report an obstacle if a sequence of commands leads to it

## Built With

- [Node.js](https://nodejs.org/it/) - Open-source, cross-platform, JavaScript runtime environment.

## Author

- **Fabio Mangano**
