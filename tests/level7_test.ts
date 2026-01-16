import Elevator from "../Elevator";
import Person from "../Person";
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

describe("Level 7: Added Feature Test (Floor history tracking)", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("can track floor history", () => {
    const personA = new Person("PersonA", 3, 5);
    const personB = new Person("PersonB", 7, 8);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    elevator.dispatch();

    console.log(elevator.floorMovementHistory.getData());

    // assert.equal(elevator.currentFloor, 0);
    // assert.equal(elevator.requests.length, 0);
    // assert.equal(elevator.riders.length, 0);
    // assert.isAtLeast(elevator.floorsTraversed, 13);
  });
});
