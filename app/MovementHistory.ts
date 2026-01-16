export interface FloorMovementTrack {
  floor: number;
  personName: string;
  stopped: boolean;
}

export default class MovementHistory {
  #data: Array<FloorMovementTrack> = [];

  constructor(data: Array<FloorMovementTrack> = []) {
    this.#data = data;
  }

  getData(): Array<FloorMovementTrack> {
    return this.#data;
  }

  pushTrack(floor: number, personName: string, stopped: boolean = false): void {
    this.#data.push({ floor, personName, stopped });
  }

  updateStopped(indx: number, flag: boolean) {
    this.#data[indx].stopped = flag;
  }
}
