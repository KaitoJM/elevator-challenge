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

describe("Utility methods", () => {
  let controller;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
  });

  it("should reset elevator to initial state", () => {
    controller.elevator.currentFloor = 5;
    controller.elevator.floorsTraversed = 100;
    controller.elevator.stops = 10;
    controller.requests.push(new Person("PersonA", 2, 5));
    controller.riders.push(new Person("PersonB", 3, 7));

    controller.reset();

    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.elevator.floorsTraversed, 0);
    assert.equal(controller.elevator.stops, 0);
    assert.equal(controller.requests.length, 0);
    assert.equal(controller.riders.length, 0);
  });
});
