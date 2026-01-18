export default class Person {
  id;
  name;
  currentFloor;
  dropOffFloor;

  constructor(id, name, currentFloor, dropOffFloor) {
    (this.id = id),
      (this.name = name),
      (this.currentFloor = currentFloor),
      (this.dropOffFloor = dropOffFloor);
  }
}
