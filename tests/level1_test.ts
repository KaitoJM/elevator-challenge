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

describe("Level 1: Basic Elevator and Person functionality", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("should instantiate with starting floor at 0 (lobby)", () => {
    assert.equal(elevator.currentFloor, 0);
  });

  it("should have empty requests and riders collections on instantiation", () => {
    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
  });

  it("should pick up a person on their current floor", () => {
    const person = new Person("Alice", 3, 7);
    elevator.requests.push(person);
    elevator.moveToFloor(3);
    elevator.pickup(person);

    assert.include(elevator.riders, person);
    assert.equal(elevator.riders.length, 1);
  });

  it("should drop off a person on their destination floor", () => {
    const person = new Person("Alice", 3, 7);
    elevator.riders.push(person);
    elevator.currentFloor = 7;
    elevator.dropOff(person);

    assert.notInclude(elevator.riders, person);
    assert.equal(elevator.riders.length, 0);
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
