import { PipeResult, RecordHistoryPipe } from "../RecordFloorHistory.pipeline";
import RecordFloorHistoryContext from "../contexts/RecordFloorHistory.context";

export default class SkipDuplicatePickupPipe implements RecordHistoryPipe {
  handle(ctx: RecordFloorHistoryContext): PipeResult {
    if (
      ctx.onBoarding.length &&
      ctx.onBoarding[0].currentFloor === ctx.currentFloor &&
      !ctx.person
    ) {
      return { type: "stop", history: ctx.history };
    }

    return { type: "continue" };
  }
}
