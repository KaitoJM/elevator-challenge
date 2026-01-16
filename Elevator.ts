import Clock from "./Clock";
import LobbyPolicy from "./LobbyPolicy";
import MovementHistory, { FloorMovementTrack } from "./MovementHistory";
import Person from "./Person";

export default class Elevator {
  currentFloor: number = 0;
  stops: number = 0;
  floorsTraversed: number = 0;
  requests: Array<Person> = [];
  riders: Array<Person> = [];
  clock: Clock;
  lobbyPolicy: LobbyPolicy;
  floorMovementHistory: MovementHistory;
  stoppedFlag: boolean = false;
  activePerson: Person | null = null;

  constructor(clock: Clock, lobbyPolicy?: LobbyPolicy) {
    this.clock = clock || new Clock();
    this.lobbyPolicy = lobbyPolicy || new LobbyPolicy();
    this.floorMovementHistory = new MovementHistory();
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
    this.stoppedFlag = false;
    this.floorsTraversed++;
    if (this.hasStop()) {
      this.stops++;
    }
    this.recordTrack();
  }

  pickup(person: Person) {
    this.activePerson = person;
    this.stoppedFlag = true;
    this.riders.push(person);
    this.requests.shift();
    this.recordTrack();
  }

  dropOff(person: Person) {
    this.stoppedFlag = true;
    this.riders = this.riders.filter((r) => r !== person);
    this.activePerson = null;
    this.recordTrack();
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

  recordTrack() {
    const person = this.activePerson;
    const history = this.floorMovementHistory.getData();

    // remove pickup duplicate floor
    if (
      this.requests.length &&
      this.requests[0].currentFloor === this.currentFloor &&
      !person
    ) {
      return;
    }

    if (history.length) {
      const lastTrack: FloorMovementTrack = history[history.length - 1];

      if (
        person &&
        this.currentFloor == lastTrack.floor &&
        person.name === lastTrack.personName &&
        this.stoppedFlag == lastTrack.stopped
      ) {
        return;
      }

      // remove dropOff duplicate floor
      if (
        this.currentFloor === lastTrack.floor &&
        this.stoppedFlag !== lastTrack.stopped
      ) {
        const indx = history.indexOf(lastTrack);
        this.floorMovementHistory.updateStopped(indx, this.stoppedFlag);
        return;
      }
    }

    this.floorMovementHistory.pushTrack(
      this.currentFloor,
      person?.name as string,
      this.stoppedFlag
    );
  }

  reset() {
    this.currentFloor = 0;
    this.stops = 0;
    this.floorsTraversed = 0;
    this.requests = [];
    this.riders = [];
  }
}
