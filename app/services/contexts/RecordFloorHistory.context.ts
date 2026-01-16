import MovementHistory, { FloorMovementTrack } from "../../MovementHistory";
import Person from "../../Person";

export default class RecordFloorHistoryContext {
  person: Person | null;
  history: MovementHistory;
  onBoarding: Array<Person>;
  currentFloor: number;
  stoppedFlag: boolean;
  lastTrack: FloorMovementTrack;

  constructor(
    person: Person | null,
    history: MovementHistory,
    onBoarding: Array<Person>,
    currentFloor: number,
    stoppedFlag: boolean
  ) {
    this.person = person;
    this.history = history;
    this.onBoarding = onBoarding;
    this.currentFloor = currentFloor;
    this.stoppedFlag = stoppedFlag;

    const hist = this.history.getData();
    this.lastTrack = hist[hist.length - 1];
  }
}
