export default class Person {
  name: string;
  currentFloor: number;
  dropOffFloor: number;

  constructor(name: string, currentFloor: number, dropOffFloor: number) {
    (this.name = name),
      (this.currentFloor = currentFloor),
      (this.dropOffFloor = dropOffFloor);
  }
}
