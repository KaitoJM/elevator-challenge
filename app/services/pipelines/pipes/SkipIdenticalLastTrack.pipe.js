export default class SkipIdenticalLastTrackPipe {
  handle(ctx) {
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
