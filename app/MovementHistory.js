export default class MovementHistory {
  #data = [];

  constructor(data = []) {
    this.#data = data;
  }

  getData() {
    return this.#data;
  }

  pushTrack(floor, personName, stopped = false) {
    this.#data.push({ floor, personName, stopped });
  }

  updateStopped(indx, flag) {
    this.#data[indx].stopped = flag;
  }
}
