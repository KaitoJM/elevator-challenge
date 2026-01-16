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

describe("Level 2: Elevator method tests and tracking", () => {
  let controller: ElevatorController;
  let elevator: Elevator;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
    elevator = new Elevator();
  });

  it("moveUp should increment current floor", () => {
    controller.elevator.moveUp();
    assert.equal(controller.elevator.currentFloor, 1);
  });

  it("moveDown should decrement current floor", () => {
    elevator.currentFloor = 5;
    elevator.moveDown();
    assert.equal(elevator.currentFloor, 4);
  });

  it("moveDown should not go below floor 0", () => {
    elevator.currentFloor = 0;
    elevator.moveDown();
    assert.equal(elevator.currentFloor, 0);
  });

  it("moveToFloor should move elevator to target floor going up", () => {
    controller.moveToFloor(5);
    assert.equal(controller.elevator.currentFloor, 5);
  });

  it("moveToFloor should move elevator to target floor going down", () => {
    controller.elevator.currentFloor = 8;
    controller.moveToFloor(3);
    assert.equal(controller.elevator.currentFloor, 3);
  });

  it("should track floors traversed correctly when person goes up", () => {
    const person = new Person("PersonA", 2, 5);
    controller.requests.push(person);
    controller.dispatch();

    assert.equal(controller.elevator.floorsTraversed, 10);
  });

  it("should track stops correctly when person goes up", () => {
    const person = new Person("PersonA", 2, 5);
    controller.requests.push(person);
    controller.dispatch();

    assert.equal(controller.elevator.stops, 2);
  });

  it("should track floors traversed correctly when person goes down", () => {
    const person = new Person("PersonA", 8, 3);
    controller.requests.push(person);
    controller.dispatch();

    assert.equal(controller.elevator.floorsTraversed, 16);
  });

  it("should track stops correctly when person goes down", () => {
    const person = new Person("PersonA", 8, 3);
    controller.requests.push(person);
    controller.dispatch();

    assert.equal(controller.elevator.stops, 2);
  });
});
