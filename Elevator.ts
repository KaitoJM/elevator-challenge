import Clock from "./Clock";
import LobbyPolicy from "./LobbyPolicy";
import Person from "./Person";

export default class Elevator {
  currentFloor: number = 0;
  stops: number = 0;
  floorsTraversed: number = 0;
  requests: Array<Person> = [];
  riders: Array<Person> = [];
  clock: Clock;
  lobbyPolicy: LobbyPolicy;

  constructor(clock: Clock, lobbyPolicy?: LobbyPolicy) {
    this.clock = clock || new Clock();
    this.lobbyPolicy = lobbyPolicy || new LobbyPolicy();
  }

  dispatch() {
    while (this.requests.length > 0) {
      const person = this.requests[0];
      this.handleRequest(person);
    }

    this.handleIdleState();
  }

  handleRequest(person: Person) {
    this.moveToFloor(person.currentFloor);
    this.pickup(person);
    this.moveToFloor(person.dropOffFloor);
    this.dropOff(person);
  }

  moveToFloor(targetFloor: number) {
    while (this.currentFloor !== targetFloor) {
      this.currentFloor < targetFloor ? this.moveUp() : this.moveDown();
    }
  }

  moveUp() {
    this.currentFloor++;
    this.onMove();
  }

  moveDown() {
    if (this.currentFloor === 0) return;
    this.currentFloor--;
    this.onMove();
  }

  onMove() {
    this.floorsTraversed++;
    if (this.hasStop()) {
      this.stops++;
    }
  }

  pickup(person: Person) {
    this.riders.push(person);
    this.requests.shift();
  }

  dropOff(person: Person) {
    this.riders = this.riders.filter((r) => r !== person);
  }

  hasStop() {
    return this.hasPickup() || this.hasDropOff();
  }

  hasPickup() {
    return this.requests.some((r) => r.currentFloor === this.currentFloor);
  }

  hasDropOff() {
    return this.riders.some((r) => r.dropOffFloor === this.currentFloor);
  }

  handleIdleState() {
    const hour = this.clock.getHour();
    if (this.lobbyPolicy.shouldReturnToLobby(this.riders.length > 0, hour)) {
      this.moveToFloor(0);
    }
  }

  reset() {
    this.currentFloor = 0;
    this.stops = 0;
    this.floorsTraversed = 0;
    this.requests = [];
    this.riders = [];
  }
}
