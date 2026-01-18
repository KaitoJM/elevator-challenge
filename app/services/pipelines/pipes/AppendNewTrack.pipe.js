export default class AppendTrackPipe {
  handle(ctx) {
    ctx.history.pushTrack(ctx.currentFloor, ctx.person?.name, ctx.stoppedFlag);

    return { type: "stop", history: ctx.history };
  }
}
