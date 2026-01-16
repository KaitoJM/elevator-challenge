import Elevator from "../Elevator";
import Person from "../Person";
import * as chai from "chai";

const { assert } = chai;

class FakeClock {
  getHour(): number {
    return 10; // always before noon
  }
}

describe("Elevator", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock());
  });

  it("should bring a rider to a floor above their current floor", () => {
    const rider = new Person("Brittany", 2, 5);
    elevator.requests.push(rider);

    elevator.dispatch();
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.floorsTraversed, 10);
    assert.equal(elevator.stops, 2);
  });

  it("should bring a rider to a floor below their current floor", () => {
    const rider = new Person("Brittany", 8, 3);
    elevator.requests.push(rider);

    elevator.dispatch();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.floorsTraversed, 16);
    assert.equal(elevator.stops, 2);
  });
});
