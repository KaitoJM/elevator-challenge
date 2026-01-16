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

describe("Level 4: Multiple requests in order", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("should handle multiple sequential requests", () => {
    const bob = new Person("Bob", 3, 9);
    const sue = new Person("Sue", 6, 2);

    elevator.requests.push(bob);
    elevator.requests.push(sue);

    elevator.dispatch();

    assert.equal(elevator.floorsTraversed, 18);
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.riders.length, 0);
  });

  it("should pick up and drop off people in order of requests", () => {
    const alice = new Person("Alice", 2, 5);
    const bob = new Person("Bob", 4, 8);

    elevator.requests.push(alice);
    elevator.requests.push(bob);

    elevator.dispatch();

    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.requests.length, 0);
  });

  it("should handle multiple requests with different destinations", () => {
    const person1 = new Person("Person1", 2, 7);
    const person2 = new Person("Person2", 5, 1);
    const person3 = new Person("Person3", 8, 4);

    elevator.requests.push(person1);
    elevator.requests.push(person2);
    elevator.requests.push(person3);

    elevator.dispatch();

    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 0);
  });
});
