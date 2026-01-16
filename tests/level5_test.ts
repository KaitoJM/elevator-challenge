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

describe("Level 5: Multiple requests with different directions", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("Person A goes up, Person B goes up", () => {
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    elevator.dispatch();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
    assert.isAtLeast(elevator.floorsTraversed, 13);
  });

  it("Person A goes up, Person B goes down", () => {
    const personA = new Person("PersonA", 2, 7);
    const personB = new Person("PersonB", 9, 3);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    elevator.dispatch();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
  });

  it("Person A goes down, Person B goes up", () => {
    const personA = new Person("PersonA", 8, 2);
    const personB = new Person("PersonB", 3, 10);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    elevator.dispatch();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
  });

  it("Person A goes down, Person B goes down", () => {
    const personA = new Person("PersonA", 9, 4);
    const personB = new Person("PersonB", 7, 1);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    elevator.dispatch();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
  });

  it("should track requests correctly with multiple people", () => {
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    assert.equal(elevator.requests.length, 2);

    elevator.dispatch();

    assert.equal(elevator.requests.length, 0);
  });

  it("should track riders correctly with multiple people", () => {
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    elevator.requests.push(personA);
    elevator.requests.push(personB);

    elevator.dispatch();

    assert.equal(elevator.riders.length, 0);
  });
});
