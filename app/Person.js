export default class Person {
  id;
  name;
  currentFloor;
  dropOffFloor;

  constructor(name, currentFloor, dropOffFloor, id = null) {
    (this.id = id),
      (this.name = name),
      (this.currentFloor = currentFloor),
      (this.dropOffFloor = dropOffFloor);
  }
}
