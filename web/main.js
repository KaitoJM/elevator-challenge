import Clock from "../app/Clock.js";
import ElevatorController from "../app/ElevatorController.js";

let onborders = [];

const removeOnboarder = (indx) => {
  onborders.splice(indx, 1);
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
      const index = Number(e.currentTarget.dataset.index);
      removeOnboarder(index);
    });
  });
};

listOnboarders();

const addOnBoarderForm = document.getElementById("onboardForm");
addOnBoarderForm.addEventListener("submit", (e) => {
  const formData = new FormData(addOnBoarderForm);

  const name = formData.get("personName");
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

const dispatchBtn = document.getElementById("btn-dispatch");
dispatchBtn.addEventListener("click", () => {
  const controller = new ElevatorController(new Clock());

  onborders.forEach((person) => {
    controller.requests.push(person);
  });

  controller.dispatch();
  playVisual(controller.floorMovementHistory.getData(), onborders);
});

const playVisual = (history, onboarders) => {
  const distinctFloors = [...new Set(history.map((item) => item.floor))];

  generateElevatorFloors(distinctFloors, onboarders);
  runElevator(history);
};

const generateElevatorFloors = (floors, onborders) => {
  const floorList = document.getElementById("floor-list");

  floorList.innerHTML = `${floors
    .map(
      (floor) => `<li class="floor" data-floor="${floor}">
      <div class="floor-label">${floor}</div>
      <div class="floor-container">
        <img src="./person.png" class="person-indicator" />
      </div>
      <div class="floor-outside">
        ${
          onborders.find((person) => person.currentFloor === floor)
            ? `<img src="./person.png" class="person-indicator" data-name="${
                onborders.find((person) => person.currentFloor === floor)?.name
              }" />`
            : ``
        }
      </div>
    </li>`
    )
    .join("")}`;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const runElevator = async (pathHistory) => {
  for (const track of pathHistory) {
    document.querySelectorAll(".floor").forEach((floorItem) => {
      floorItem.classList.remove("active");
    });

    document
      .querySelectorAll(".floor .floor-container .person-indicator")
      .forEach((floorItem) => {
        floorItem.classList.remove("show");
      });

    document.querySelectorAll(".floor").forEach((floorItem) => {
      const floorNumber = Number(floorItem.dataset.floor);

      if (track.floor === floorNumber) {
        // make elevator floor highlight
        floorItem.classList.add("active");

        if (track.personName !== undefined) {
          // Show the riding person indicator if matched the current floor
          const indicator = floorItem.querySelector(
            ".floor-container .person-indicator"
          );

          if (indicator) {
            indicator.classList.add("show");
          }

          // Remove onboarding person indicator if matched the current floor
          const onboarderindicator = floorItem.querySelector(
            ".floor-outside .person-indicator"
          );

          if (onboarderindicator) {
            const onBoarderName = String(onboarderindicator.dataset.name);

            if (onBoarderName == track.personName) {
              onboarderindicator.remove();
            }
          }
        }
      }
    });

    await sleep(1500);
  }

  // remove elevator floor indicator at the end
  document
    .querySelectorAll(".floor .floor-container .person-indicator")
    .forEach((floorItem) => {
      floorItem.classList.remove("show");
    });
};
