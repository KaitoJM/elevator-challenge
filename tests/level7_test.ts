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

describe("Level 7: Added Feature Test (Floor history tracking)", () => {
  let controller: ElevatorController;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
  });

  it("can track floor history", () => {
    const personA = new Person("PersonA", 3, 5);
    const personB = new Person("PersonB", 7, 8);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    // console.log(controller.floorMovementHistory.getData());

    // assert.equal(controller.currentFloor, 0);
    // assert.equal(controller.requests.length, 0);
    // assert.equal(controller.riders.length, 0);
    // assert.isAtLeast(controller.floorsTraversed, 13);
  });
});
