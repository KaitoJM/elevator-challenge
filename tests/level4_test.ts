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

    const tracking = elevator.floorMovementHistory.getData();
    assert.equal(tracking[0].floor, 1);
    assert.equal(tracking[1].floor, 2);
    assert.equal(tracking[2].floor, 3);
    assert.equal(tracking[3].floor, 4);
    assert.equal(tracking[4].floor, 5);
    assert.equal(tracking[5].floor, 6);
    assert.equal(tracking[6].floor, 7);
    assert.equal(tracking[7].floor, 8);
    assert.equal(tracking[8].floor, 9);
    assert.equal(tracking[9].floor, 8);
    assert.equal(tracking[10].floor, 7);
    assert.equal(tracking[11].floor, 6);
    assert.equal(tracking[12].floor, 5);
    assert.equal(tracking[13].floor, 4);
    assert.equal(tracking[14].floor, 3);
    assert.equal(tracking[15].floor, 2);
    assert.equal(tracking[16].floor, 1);
    assert.equal(tracking[17].floor, 0);

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.riders.length, 0);
  });

  it("should pick up and drop off people in order of requests", () => {
    const alice = new Person("Alice", 2, 5);
    const bob = new Person("Bob", 4, 8);

    elevator.requests.push(alice);
    elevator.requests.push(bob);

    elevator.dispatch();

    const tracking = elevator.floorMovementHistory.getData();
    assert.equal(tracking[0].floor, 1);
    assert.equal(tracking[1].floor, 2);
    assert.equal(tracking[2].floor, 3);
    assert.equal(tracking[3].floor, 4);
    assert.equal(tracking[4].floor, 5);
    assert.equal(tracking[5].floor, 4);
    assert.equal(tracking[6].floor, 5);
    assert.equal(tracking[7].floor, 6);
    assert.equal(tracking[8].floor, 7);
    assert.equal(tracking[9].floor, 8);
    assert.equal(tracking[10].floor, 7);
    assert.equal(tracking[11].floor, 6);
    assert.equal(tracking[12].floor, 5);
    assert.equal(tracking[13].floor, 4);
    assert.equal(tracking[14].floor, 3);
    assert.equal(tracking[15].floor, 2);
    assert.equal(tracking[16].floor, 1);
    assert.equal(tracking[17].floor, 0);

    assert.equal(tracking[1].personName, "Alice");
    assert.equal(tracking[2].personName, "Alice");
    assert.equal(tracking[3].personName, "Alice");
    assert.equal(tracking[4].personName, "Alice");
    assert.equal(tracking[5].personName, "Bob");
    assert.equal(tracking[6].personName, "Bob");
    assert.equal(tracking[7].personName, "Bob");
    assert.equal(tracking[8].personName, "Bob");
    assert.equal(tracking[9].personName, "Bob");

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

    const tracking = elevator.floorMovementHistory.getData();
    assert.equal(tracking[0].floor, 1);
    assert.equal(tracking[1].floor, 2);
    assert.equal(tracking[2].floor, 3);
    assert.equal(tracking[3].floor, 4);
    assert.equal(tracking[4].floor, 5);
    assert.equal(tracking[5].floor, 6);
    assert.equal(tracking[6].floor, 7);
    assert.equal(tracking[7].floor, 6);
    assert.equal(tracking[8].floor, 5);
    assert.equal(tracking[9].floor, 4);
    assert.equal(tracking[10].floor, 3);
    assert.equal(tracking[11].floor, 2);
    assert.equal(tracking[12].floor, 1);
    assert.equal(tracking[13].floor, 2);
    assert.equal(tracking[14].floor, 3);
    assert.equal(tracking[15].floor, 4);
    assert.equal(tracking[16].floor, 5);
    assert.equal(tracking[17].floor, 6);
    assert.equal(tracking[18].floor, 7);
    assert.equal(tracking[19].floor, 8);
    assert.equal(tracking[20].floor, 7);
    assert.equal(tracking[21].floor, 6);
    assert.equal(tracking[22].floor, 5);
    assert.equal(tracking[23].floor, 4);
    assert.equal(tracking[24].floor, 3);
    assert.equal(tracking[25].floor, 2);
    assert.equal(tracking[26].floor, 1);
    assert.equal(tracking[27].floor, 0);

    assert.equal(tracking[1].personName, "Person1");
    assert.equal(tracking[2].personName, "Person1");
    assert.equal(tracking[3].personName, "Person1");
    assert.equal(tracking[4].personName, "Person1");
    assert.equal(tracking[5].personName, "Person1");
    assert.equal(tracking[6].personName, "Person1");
    assert.equal(tracking[8].personName, "Person2");
    assert.equal(tracking[9].personName, "Person2");
    assert.equal(tracking[10].personName, "Person2");
    assert.equal(tracking[11].personName, "Person2");
    assert.equal(tracking[12].personName, "Person2");
    assert.equal(tracking[19].personName, "Person3");
    assert.equal(tracking[20].personName, "Person3");
    assert.equal(tracking[21].personName, "Person3");
    assert.equal(tracking[22].personName, "Person3");
    assert.equal(tracking[23].personName, "Person3");

    assert.equal(elevator.requests.length, 0);
    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 0);
  });
});
