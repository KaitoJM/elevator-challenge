export default class VisualAnimation {
  constructor(history = [], onboarders = []) {
    this.history = history;
    this.onboarders = onboarders;
    this.floors = [...new Set(history.map((item) => item.floor))];
  }

  play() {
    this.generateElevatorFloors();
    this.runElevator();
  }

  generateElevatorFloors() {
    const floorList = document.getElementById("floor-list");
    const onboarders = this.onboarders;

    floorList.innerHTML = `${this.floors
      .map(
        (floor) => `<li class="floor" data-floor="${floor}">
          <div class="floor-label">${floor}</div>
          <div class="floor-container">
            <img src="./person.png" class="person-indicator" />
          </div>
          <div class="floor-outside">
            ${
              onboarders.find((person) => person.currentFloor === floor)
                ? `<img src="./person.png" class="person-indicator" data-name="${
                    onboarders.find((person) => person.currentFloor === floor)
                      ?.name
                  }" />`
                : ``
            }
          </div>
        </li>`
      )
      .join("")}`;
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async runElevator() {
    for (const track of this.history) {
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

      await this.sleep(1500);
    }

    // remove elevator floor indicator at the end
    document
      .querySelectorAll(".floor .floor-container .person-indicator")
      .forEach((floorItem) => {
        floorItem.classList.remove("show");
      });
  }
}
