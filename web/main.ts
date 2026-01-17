import Clock from "../app/Clock";
import ElevatorController from "../app/ElevatorController";
import Person from "../app/Person";

const btn = document.getElementById("btn")!;
btn.addEventListener("click", () => {
  const personA = new Person("PersonA", 3, 5);
  const personB = new Person("PersonB", 7, 8);

  const controller = new ElevatorController(new Clock());
  controller.requests.push(personA);
  controller.requests.push(personB);
  controller.dispatch();
  console.log(controller.floorMovementHistory.getData());
});
