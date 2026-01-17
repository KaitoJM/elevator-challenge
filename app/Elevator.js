export default class Elevator {
  currentFloor = 0;
  stops = 0;
  floorsTraversed = 0;
  stoppedFlag = false;

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
  }

  reset() {
    this.currentFloor = 0;
    this.stops = 0;
    this.floorsTraversed = 0;
    this.stoppedFlag = false;
  }
}
