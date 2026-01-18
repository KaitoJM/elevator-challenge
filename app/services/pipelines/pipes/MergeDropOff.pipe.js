export default class MergeDropOffPipe {
  handle(ctx) {
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
