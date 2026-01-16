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

describe("Level 3: Track efficiency metrics", () => {
  let controller: ElevatorController;
  let elevator: Elevator;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
    elevator = new Elevator();
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
    controller.requests.push(person);
    controller.dispatch();

    assert.equal(controller.elevator.stops, 2);
    assert.isAtLeast(controller.elevator.floorsTraversed, 2);
  });

  it("should have lower efficiency (more floors) when traveling further", () => {
    const person1 = new Person("PersonA", 2, 5);
    controller.requests.push(person1);
    controller.dispatch();
    const floorsShort = controller.elevator.floorsTraversed;

    controller.reset();

    const person2 = new Person("PersonB", 2, 15);
    controller.requests.push(person2);
    controller.dispatch();
    const floorsLong = controller.elevator.floorsTraversed;

    assert.isBelow(floorsShort, floorsLong);
  });
});
