import { PipeResult, RecordHistoryPipe } from "../RecordFloorHistory.pipeline";
import RecordFloorHistoryContext from "../contexts/RecordFloorHistory.context";

export default class SkipIdenticalLastTrackPipe implements RecordHistoryPipe {
  handle(ctx: RecordFloorHistoryContext): PipeResult {
    if (!ctx.lastTrack || !ctx.person) {
      return { type: "continue" };
    }

    if (
      ctx.currentFloor === ctx.lastTrack.floor &&
      ctx.person.name === ctx.lastTrack.personName &&
      ctx.stoppedFlag === ctx.lastTrack.stopped
    ) {
      return { type: "stop", history: ctx.history };
    }

    return { type: "continue" };
  }
}
