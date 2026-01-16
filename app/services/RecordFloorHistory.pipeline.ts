import MovementHistory from "../MovementHistory";
import RecordFloorHistoryContext from "./contexts/RecordFloorHistory.context";

export type PipeResult =
  | { type: "continue" }
  | { type: "stop"; history: MovementHistory };

export interface RecordHistoryPipe {
  handle(context: RecordFloorHistoryContext): PipeResult;
}

export default class RecordFloorHistory {
  constructor(private readonly pipes: RecordHistoryPipe[]) {}

  processRecord(context: RecordFloorHistoryContext): MovementHistory {
    for (const pipe of this.pipes) {
      const result = pipe.handle(context);

      if (result.type === "stop") {
        return result.history;
      }
    }

    return context.history;
  }
}
