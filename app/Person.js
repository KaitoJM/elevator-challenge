export default class Person {
  name;
  currentFloor;
  dropOffFloor;

  constructor(name, currentFloor, dropOffFloor) {
    (this.name = name),
      (this.currentFloor = currentFloor),
      (this.dropOffFloor = dropOffFloor);
  }
}
