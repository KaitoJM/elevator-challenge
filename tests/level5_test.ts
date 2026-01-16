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

describe("Level 5: Multiple requests with different directions", () => {
  let elevator: Elevator;
  let controller: ElevatorController;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
    elevator = new Elevator();
  });

  it("Person A goes up, Person B goes up", () => {
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.requests.length, 0);
    assert.equal(controller.riders.length, 0);
    assert.isAtLeast(controller.elevator.floorsTraversed, 13);
  });

  it("Person A goes up, Person B goes down", () => {
    const personA = new Person("PersonA", 2, 7);
    const personB = new Person("PersonB", 9, 3);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.requests.length, 0);
    assert.equal(controller.riders.length, 0);
  });

  it("Person A goes down, Person B goes up", () => {
    const personA = new Person("PersonA", 8, 2);
    const personB = new Person("PersonB", 3, 10);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.requests.length, 0);
    assert.equal(controller.riders.length, 0);
  });

  it("Person A goes down, Person B goes down", () => {
    const personA = new Person("PersonA", 9, 4);
    const personB = new Person("PersonB", 7, 1);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    assert.equal(controller.elevator.currentFloor, 0);
    assert.equal(controller.requests.length, 0);
    assert.equal(controller.riders.length, 0);
  });

  it("should track requests correctly with multiple people", () => {
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    controller.requests.push(personA);
    controller.requests.push(personB);

    assert.equal(controller.requests.length, 2);

    controller.dispatch();

    assert.equal(controller.requests.length, 0);
  });

  it("should track riders correctly with multiple people", () => {
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    assert.equal(controller.riders.length, 0);
  });
});
