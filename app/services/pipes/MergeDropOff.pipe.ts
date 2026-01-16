import { PipeResult, RecordHistoryPipe } from "../RecordFloorHistory.pipeline";
import RecordFloorHistoryContext from "../contexts/RecordFloorHistory.context";

export default class MergeDropOffPipe implements RecordHistoryPipe {
  handle(ctx: RecordFloorHistoryContext): PipeResult {
    const last = ctx.lastTrack;
    if (!last) return { type: "continue" };

    if (ctx.currentFloor === last.floor && ctx.stoppedFlag !== last.stopped) {
      const index = ctx.history.getData().indexOf(last);
      ctx.history.updateStopped(index, ctx.stoppedFlag);

      return { type: "stop", history: ctx.history };
    }

    return { type: "continue" };
  }
}
