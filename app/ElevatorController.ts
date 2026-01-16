import Elevator from "./Elevator";
import Clock from "./Clock";
import LobbyPolicy from "./LobbyPolicy";
import MovementHistory from "./MovementHistory";
import Person from "./Person";
import RecordFloorHistoryContext from "./services/pipelines/contexts/RecordFloorHistory.context";
import RecordFloorHistoryService from "./services/RecordFloorHistory.service";

export default class ElevatorController {
  requests: Array<Person> = [];
  riders: Array<Person> = [];
  activePerson: Person | null = null;
  elevator: Elevator;

  clock: Clock;
  lobbyPolicy: LobbyPolicy;
  floorMovementHistory: MovementHistory;
  createHistoryService: RecordFloorHistoryService;

  constructor(clock: Clock, lobbyPolicy?: LobbyPolicy) {
    this.clock = clock || new Clock();
    this.lobbyPolicy = lobbyPolicy || new LobbyPolicy();
    this.floorMovementHistory = new MovementHistory();
    this.createHistoryService = new RecordFloorHistoryService();
    this.elevator = new Elevator();
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
    while (this.elevator.currentFloor !== targetFloor) {
      this.elevator.currentFloor < targetFloor
        ? this.elevator.moveUp()
        : this.elevator.moveDown();

      if (this.hasStop()) {
        this.elevator.stops++;
      }
      this.recordTrack();
    }
  }

  pickup(person: Person) {
    this.activePerson = person;
    this.elevator.stoppedFlag = true;
    this.riders.push(person);
    this.requests.shift();
    this.recordTrack();
  }

  dropOff(person: Person) {
    this.elevator.stoppedFlag = true;
    this.riders = this.riders.filter((r) => r !== person);
    this.activePerson = null;
    this.recordTrack();
  }

  hasStop() {
    return this.hasPickup() || this.hasDropOff();
  }

  hasPickup() {
    return this.requests.some(
      (r) => r.currentFloor === this.elevator.currentFloor
    );
  }

  hasDropOff() {
    return this.riders.some(
      (r) => r.dropOffFloor === this.elevator.currentFloor
    );
  }

  recordTrack() {
    const context = new RecordFloorHistoryContext(
      this.activePerson,
      this.floorMovementHistory,
      this.requests,
      this.elevator.currentFloor,
      this.elevator.stoppedFlag
    );

    this.floorMovementHistory = this.createHistoryService.process(context);
  }

  handleIdleState() {
    const hour = this.clock.getHour();
    if (this.lobbyPolicy.shouldReturnToLobby(this.riders.length > 0, hour)) {
      this.moveToFloor(0);
    }
  }

  reset() {
    this.elevator.reset();
    this.requests = [];
    this.riders = [];
    this.activePerson = null;
  }
}
