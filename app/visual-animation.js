export default class VisualAnimation {
  constructor(history = [], onboarders = []) {
    this.history = history;
    this.waiting = [...onboarders];
    this.riding = [];
    this.dropped = [];

    this.floors = [...new Set(history.map((h) => h.floor))].sort(
      (a, b) => a - b
    );

    this.floorBlueprint = this.floors.map((floor) => ({
      floor,
      onboarders: this.waiting.filter((p) => p.currentFloor === floor),
      riding: [],
      dropoffs: [],
      active: false,
    }));
  }

  play() {
    this.renderScene();
    this.run();
  }

  async run() {
    for (const track of this.history) {
      const floorIndex = this.floorBlueprint.findIndex(
        (f) => f.floor === track.floor
      );
      const floor = this.floorBlueprint[floorIndex];

      // activate floor
      this.floorBlueprint.forEach((f) => {
        f.active = false;
        f.riding = []; // clear riding visuals
        f.dropoffs = [];
      });

      floor.active = true;

      if (track.stopped) {
        /** DROP OFF **/
        if (this.riding.length && this.riding[0].dropOffFloor === track.floor) {
          floor.dropoffs = [...this.riding];
          this.riding = [];
        }

        /** PICK UP (FIFO) **/
        if (this.riding.length === 0 && this.waiting.length) {
          const next = this.waiting[0];

          if (next.currentFloor === track.floor) {
            this.riding.push(next);
            this.waiting.shift();
            floor.onboarders = floor.onboarders.filter((p) => p !== next);
          }
        }
      }

      // show riding ONLY on active floor
      floor.riding = [...this.riding];

      this.renderScene();
      await this.sleep(1500);
    }
  }

  renderScene() {
    const floorList = document.getElementById("floor-list");

    floorList.innerHTML = this.floorBlueprint
      .map(
        (floor) => `
        <li class="floor ${floor.active ? "active" : ""}" data-floor="${
          floor.floor
        }">
          <div class="floor-label">${floor.floor}</div>

          <div class="floor-waiting">
            ${floor.onboarders
              .map(
                (p) =>
                  `<img src="./app/assets/person.png" class="person-indicator" data-name="${p.name}" />`
              )
              .join("")}
          </div>

          <div class="floor-container">
            ${
              floor.riding.length
                ? `<img src="./app/assets/person.png" class="person-indicator riding" />`
                : ""
            }
          </div>

          <div class="floor-outside">
            ${floor.dropoffs
              .map(
                (p) =>
                  `<img src="./app/assets/person.png" class="person-indicator dropped" data-name="${p.name}" />`
              )
              .join("")}
          </div>
        </li>
      `
      )
      .join("");
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
