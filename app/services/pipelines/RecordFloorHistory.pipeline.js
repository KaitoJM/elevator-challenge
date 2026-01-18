export default class RecordFloorHistory {
  constructor(pipes) {
    this.pipes = pipes;
  }

  processRecord(context) {
    for (const pipe of this.pipes) {
      const result = pipe.handle(context);

      if (result.type === "stop") {
        return result.history;
      }
    }

    return context.history;
  }
}
