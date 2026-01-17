export default class RecordFloorHistoryContext {
  person;
  history;
  onBoarding;
  currentFloor;
  stoppedFlag;
  lastTrack;

  constructor(person, history, onBoarding, currentFloor, stoppedFlag) {
    this.person = person;
    this.history = history;
    this.onBoarding = onBoarding;
    this.currentFloor = currentFloor;
    this.stoppedFlag = stoppedFlag;

    const hist = this.history.getData();
    this.lastTrack = hist[hist.length - 1];
  }
}
