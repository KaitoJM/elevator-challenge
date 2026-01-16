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

describe("Level 6: Lobby policy and idle behavior", () => {
  it("should return to lobby before noon when no riders", () => {
    const morningElevator = new Elevator(new FakeClock(10));
    const person = new Person("PersonA", 3, 6);
    morningElevator.requests.push(person);

    morningElevator.dispatch();

    assert.equal(morningElevator.currentFloor, 0);
    assert.equal(morningElevator.riders.length, 0);
  });

  it("should stay on last floor after noon when no riders", () => {
    const afternoonElevator = new Elevator(new FakeClock(14));
    const person = new Person("PersonA", 3, 6);
    afternoonElevator.requests.push(person);

    afternoonElevator.dispatch();

    assert.equal(afternoonElevator.currentFloor, 6);
    assert.equal(afternoonElevator.riders.length, 0);
  });

  it("should return to lobby at exactly 12:00 PM with no riders", () => {
    const noonElevator = new Elevator(new FakeClock(12));
    const person = new Person("PersonA", 3, 6);
    noonElevator.requests.push(person);

    noonElevator.dispatch();

    assert.equal(noonElevator.currentFloor, 6);
  });

  it("should not return to lobby before noon if there are still riders", () => {
    const morningElevator = new Elevator(new FakeClock(10));
    const personStill = new Person("PersonStill", 5, 5);
    morningElevator.currentFloor = 5;
    morningElevator.riders.push(personStill);

    morningElevator.handleIdleState();

    assert.equal(morningElevator.currentFloor, 5);
  });

  it("should handle multiple people with morning return to lobby", () => {
    const morningElevator = new Elevator(new FakeClock(9));
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    morningElevator.requests.push(personA);
    morningElevator.requests.push(personB);

    morningElevator.dispatch();

    assert.equal(morningElevator.currentFloor, 0);
  });

  it("should handle multiple people with afternoon stay", () => {
    const afternoonElevator = new Elevator(new FakeClock(15));
    const personA = new Person("PersonA", 2, 5);
    const personB = new Person("PersonB", 4, 8);

    afternoonElevator.requests.push(personA);
    afternoonElevator.requests.push(personB);

    afternoonElevator.dispatch();

    assert.equal(afternoonElevator.currentFloor, 8);
  });
});
