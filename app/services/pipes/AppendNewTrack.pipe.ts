import { PipeResult, RecordHistoryPipe } from "../RecordFloorHistory.pipeline";
import RecordFloorHistoryContext from "../contexts/RecordFloorHistory.context";

export default class AppendTrackPipe implements RecordHistoryPipe {
  handle(ctx: RecordFloorHistoryContext): PipeResult {
    ctx.history.pushTrack(
      ctx.currentFloor,
      ctx.person?.name as string,
      ctx.stoppedFlag
    );

    return { type: "stop", history: ctx.history };
  }
}
