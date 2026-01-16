import Elevator from "../app/Elevator";
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

describe("Level 3: Track efficiency metrics", () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = new Elevator(new FakeClock(10));
  });

  it("should initialize with 0 floors traversed", () => {
    assert.equal(elevator.floorsTraversed, 0);
  });

  it("should initialize with 0 stops", () => {
    assert.equal(elevator.stops, 0);
  });

  it("should increment floors traversed on each floor movement", () => {
    elevator.moveUp();
    assert.equal(elevator.floorsTraversed, 1);
    elevator.moveUp();
    assert.equal(elevator.floorsTraversed, 2);
  });

  it("should only count stops at floors with pickups or dropoffs", () => {
    const person = new Person("PersonA", 3, 6);
    elevator.requests.push(person);
    elevator.dispatch();

    assert.equal(elevator.stops, 2);
    assert.isAtLeast(elevator.floorsTraversed, 2);
  });

  it("should have lower efficiency (more floors) when traveling further", () => {
    const person1 = new Person("PersonA", 2, 5);
    elevator.requests.push(person1);
    elevator.dispatch();
    const floorsShort = elevator.floorsTraversed;

    elevator.reset();

    const person2 = new Person("PersonB", 2, 15);
    elevator.requests.push(person2);
    elevator.dispatch();
    const floorsLong = elevator.floorsTraversed;

    assert.isBelow(floorsShort, floorsLong);
  });
});
