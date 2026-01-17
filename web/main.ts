import Clock from "../app/Clock";
import ElevatorController from "../app/ElevatorController";
import Person from "../app/Person";

let onborders: Array<Person> = [];

const removeOnboarder = (indx: number) => {
  if (indx == 0) {
    onborders = [];
    listOnboarders();
    return;
  }

  onborders = onborders.splice(indx, 1);
  listOnboarders();
};

const listOnboarders = () => {
  const listContainer = document.getElementById("onboarding-list-ul");

  let listItem = "";

  if (listContainer) {
    if (!onborders.length) {
      listContainer.innerHTML = `<div class="empty-state">
      <p>No onboarders yet.</p>
      </div>`;
      return;
    }

    onborders.forEach((person, indx) => {
      listItem += `<tr>
        <td class="list-person-name">${person.name}</td>
        <td class="list-person-currentl-floor">${person.currentFloor}</td>
        <td class="list-person-dropoff-floor">${person.dropOffFloor}</td>
        <td>
          <button data-index="${indx}" class="btn-remove-onboarder danger small">Remove</button>
        </td>
        </tr>`;
    });

    listContainer.innerHTML = `<h3 class="list-title">On Boarders</h3>
    <table>
      <thead>
        <tr>
          <th>Person</th>
          <th>Pickup Floor</th>
          <th>Dropoff Floor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${listItem}</tbody>
      </table>`;
  }

  document.querySelectorAll(".btn-remove-onboarder").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number((e.currentTarget as HTMLElement).dataset.index);
      removeOnboarder(index);
    });
  });
};

listOnboarders();

const addOnBoarderForm = document.getElementById(
  "onboardForm"
) as HTMLFormElement;
addOnBoarderForm.addEventListener("submit", (e) => {
  const formData = new FormData(addOnBoarderForm);

  const name = formData.get("personName") as string;
  const currentFloor = Number(formData.get("currentFloor"));
  const dropOffFloor = Number(formData.get("dropOffFloor"));

  onborders.push({
    name: name,
    currentFloor: currentFloor,
    dropOffFloor: dropOffFloor,
  });

  addOnBoarderForm.reset();

  listOnboarders();

  e.preventDefault();
});

const dispatchBtn = document.getElementById("btn-dispatch")!;
dispatchBtn.addEventListener("click", () => {
  const controller = new ElevatorController(new Clock());

  onborders.forEach((person) => {
    controller.requests.push(person);
  });

  controller.dispatch();
  console.log(controller.floorMovementHistory.getData());
});
