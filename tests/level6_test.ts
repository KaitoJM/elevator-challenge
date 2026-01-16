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

describe("Level 6: Lobby policy and idle behavior", () => {
  it("should return to lobby before noon when no riders", () => {
    const morningElevatorController = new ElevatorController(new FakeClock(10));
    const person = new Person("PersonA", 3, 6);
    morningElevatorController.requests.push(person);

    morningElevatorController.dispatch();

    assert.equal(morningElevatorController.elevator.currentFloor, 0);
    assert.equal(morningElevatorController.riders.length, 0);
  });

  it("should stay on last floor after noon when no riders", () => {
    const afternoonElevatorController = new ElevatorController(
      new FakeClock(14)
    );
    const person = new Person("PersonA", 3, 6);
    afternoonElevatorController.requests.push(person);

    afternoonElevatorController.dispatch();

    assert.equal(afternoonElevatorController.elevator.currentFloor, 6);
    assert.equal(afternoonElevatorController.riders.length, 0);
  });

  it("should return to lobby at exactly 12:00 PM with no riders", () => {
    const noonElevatorController = new ElevatorController(new FakeClock(12));
    const person = new Person("PersonA", 3, 6);
    noonElevatorController.requests.push(person);

    noonElevatorController.dispatch();

    assert.equal(noonElevatorController.elevator.currentFloor, 6);
  });

  it("should not return to lobby before noon if there are still riders", () => {
    const morningElevatorController = new ElevatorController(new FakeClock(10));
    const personStill = new Person("PersonStill", 5, 5);
    morningElevatorController.elevator.currentFloor = 5;
    morningElevatorController.riders.push(personStill);

    morningElevatorController.handleIdleState();

    assert.equal(morningElevatorController.elevator.currentFloor, 5);
  });

  it("should handle multiple people with morning return to lobby", () => {
    const morningElevatorController = new ElevatorController(new FakeClock(9));
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    morningElevatorController.requests.push(personA);
    morningElevatorController.requests.push(personB);

    morningElevatorController.dispatch();

    assert.equal(morningElevatorController.elevator.currentFloor, 0);
  });

  it("should handle multiple people with afternoon stay", () => {
    const afternoonElevatorController = new ElevatorController(
      new FakeClock(15)
    );
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    afternoonElevatorController.requests.push(personA);
    afternoonElevatorController.requests.push(personB);

    afternoonElevatorController.dispatch();

    assert.equal(afternoonElevatorController.elevator.currentFloor, 8);
  });
});
