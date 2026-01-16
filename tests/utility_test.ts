import Elevator from "../app/Elevator";
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
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("should reset elevator to initial state", () => {
    elevator.currentFloor = 5;
    elevator.floorsTraversed = 100;
    elevator.stops = 10;
    elevator.requests.push(new Person("PersonA", 2, 5));
    elevator.riders.push(new Person("PersonB", 3, 7));

    elevator.reset();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.floorsTraversed, 0);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
  });
});
