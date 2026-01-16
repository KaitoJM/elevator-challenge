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

describe("Level 2: Elevator method tests and tracking", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("moveUp should increment current floor", () => {
    elevator.moveUp();
    assert.equal(elevator.currentFloor, 1);
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
    elevator.moveToFloor(5);
    assert.equal(elevator.currentFloor, 5);
  });

  it("moveToFloor should move elevator to target floor going down", () => {
    elevator.currentFloor = 8;
    elevator.moveToFloor(3);
    assert.equal(elevator.currentFloor, 3);
  });

  it("should track floors traversed correctly when person goes up", () => {
    const person = new Person("PersonA", 2, 5);
    elevator.requests.push(person);
    elevator.dispatch();

    assert.equal(elevator.floorsTraversed, 10);
  });

  it("should track stops correctly when person goes up", () => {
    const person = new Person("PersonA", 2, 5);
    elevator.requests.push(person);
    elevator.dispatch();

    assert.equal(elevator.stops, 2);
  });

  it("should track floors traversed correctly when person goes down", () => {
    const person = new Person("PersonA", 8, 3);
    elevator.requests.push(person);
    elevator.dispatch();

    assert.equal(elevator.floorsTraversed, 16);
  });

  it("should track stops correctly when person goes down", () => {
    const person = new Person("PersonA", 8, 3);
    elevator.requests.push(person);
    elevator.dispatch();

    assert.equal(elevator.stops, 2);
  });
});
