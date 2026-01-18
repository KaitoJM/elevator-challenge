const assert = require("chai").assert;
const ElevatorController = require("../app/ElevatorController").default;
const Elevator = require("../app/Elevator").default;
const Person = require("../app/Person").default;

class FakeClock {
  hour;

  constructor(hour = 10) {
    this.hour = hour;
  }

  getHour() {
    return this.hour;
  }
}

describe("Level 3: Track efficiency metrics", () => {
  let controller;
  let elevator;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
    elevator = new Elevator();
  });

  it("should initialize with 0 floors traversed", () => {
    assert.equal(elevator.floorsTraversed, 0);
  });

  it("should initialize with 0 stops", () => {
    assert.equal(elevator.stops, 0);
  });

  it("should increment floors traversed on each floor movement", () => {
    elevator.moveUp();
    assert.equal(elevator.floorsTraversed, 1);
    elevator.moveUp();
    assert.equal(elevator.floorsTraversed, 2);
  });

  it("should only count stops at floors with pickups or dropoffs", () => {
    const person = new Person("PersonA", 3, 6);
    controller.requests.push(person);
    controller.dispatch();

    assert.equal(controller.elevator.stops, 2);
    assert.isAtLeast(controller.elevator.floorsTraversed, 2);
  });

  it("should have lower efficiency (more floors) when traveling further", () => {
    const person1 = new Person("PersonA", 2, 5);
    controller.requests.push(person1);
    controller.dispatch();
    const floorsShort = controller.elevator.floorsTraversed;

    controller.reset();

    const person2 = new Person("PersonB", 2, 15);
    controller.requests.push(person2);
    controller.dispatch();
    const floorsLong = controller.elevator.floorsTraversed;

    assert.isBelow(floorsShort, floorsLong);
  });
});
