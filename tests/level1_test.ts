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

describe("Level 1: Basic Elevator and Person functionality", () => {
  let elevator: Elevator;
  let controller: ElevatorController;

  beforeEach(() => {
    elevator = new Elevator();
    controller = new ElevatorController(new FakeClock(10));
  });

  it("should instantiate with starting floor at 0 (lobby)", () => {
    assert.equal(elevator.currentFloor, 0);
  });

  it("should have empty requests and riders collections on instantiation", () => {
    assert.equal(controller.requests.length, 0);
    assert.equal(controller.riders.length, 0);
  });

  it("should pick up a person on their current floor", () => {
    const person = new Person("Alice", 3, 7);
    controller.requests.push(person);
    controller.moveToFloor(3);
    controller.pickup(person);

    assert.include(controller.riders, person);
    assert.equal(controller.riders.length, 1);
  });

  it("should drop off a person on their destination floor", () => {
    const person = new Person("Alice", 3, 7);
    controller.riders.push(person);
    controller.dropOff(person);

    assert.notInclude(controller.riders, person);
    assert.equal(controller.riders.length, 0);
  });

  it("should bring a rider to a floor above their current floor", () => {
    const rider = new Person("Brittany", 2, 5);
    controller.requests.push(rider);

    controller.dispatch();
    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.elevator.floorsTraversed, 10);
    assert.equal(controller.elevator.stops, 2);
  });

  it("should bring a rider to a floor below their current floor", () => {
    const rider = new Person("Brittany", 8, 3);
    controller.requests.push(rider);

    controller.dispatch();
    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.elevator.floorsTraversed, 16);
    assert.equal(controller.elevator.stops, 2);
  });
});
