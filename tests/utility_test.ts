import Elevator from "../app/Elevator";
import ElevatorController from "../app/ElevatorController";
import Person from "../app/Person";
import * as chai from "chai";

const { assert } = chai;

class FakeClock {
  private hour: number;

  constructor(hour: number = 10) {
    this.hour = hour;
  }

  getHour(): number {
    return this.hour;
  }
}

describe("Utility methods", () => {
  let controller: ElevatorController;

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
