import Clock from "./Clock.js";
import ElevatorController from "./ElevatorController.js";
import VisualAnimation from "./visual-animation.js";
import OnboardingService from "./services/Onboarding.service.js";

let onborders = [];

async function loadOnboarders() {
  const data = await OnboardingService.getAll();
  onborders = data;
}

async function addOnboarder(newPerson) {
  const created = await OnboardingService.create(newPerson);
  return created;
}

async function deleteOnboarder(id) {
  const result = await OnboardingService.delete(id);
  console.log("Deleted:", result);
}

await loadOnboarders();

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

    onborders.forEach((person) => {
      listItem += `<tr>
        <td class="list-person-name">${person.name}</td>
        <td class="list-person-currentl-floor">${person.currentFloor}</td>
        <td class="list-person-dropoff-floor">${person.dropOffFloor}</td>
        <td>
          <button data-id="${person.id}" class="btn-remove-onboarder danger small">Remove</button>
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
      const personId = Number(e.currentTarget.dataset.id);
      const ans = confirm("Delete this person from request?");
      if (ans) {
        removeOnboarder(personId);
      }
    });
  });
};

listOnboarders();

const removeOnboarder = async (id) => {
  try {
    await deleteOnboarder(id);
    await loadOnboarders();
    listOnboarders();
  } catch (error) {
    console.log(error);
  }
};

const addOnBoarderForm = document.getElementById("onboardForm");
addOnBoarderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(addOnBoarderForm);

  const name = formData.get("personName");
  const currentFloor = Number(formData.get("currentFloor"));
  const dropOffFloor = Number(formData.get("dropOffFloor"));

  const params = {
    name: name,
    currentFloor: currentFloor,
    dropOffFloor: dropOffFloor,
  };

  try {
    await addOnboarder(params);
    onborders.push(params);
    addOnBoarderForm.reset();
    listOnboarders();
  } catch (error) {
    console.log(error);
  }
});

const dispatchBtn = document.getElementById("btn-dispatch");
dispatchBtn.addEventListener("click", () => {
  const controller = new ElevatorController(new Clock());

  onborders.forEach((person) => {
    controller.requests.push(person);
  });

  controller.dispatch();
  const visualAnimation = new VisualAnimation(
    controller.floorMovementHistory.getData(),
    onborders
  );

  visualAnimation.play();
});
