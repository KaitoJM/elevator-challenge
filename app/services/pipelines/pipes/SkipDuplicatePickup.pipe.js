export default class SkipDuplicatePickupPipe {
  handle(ctx) {
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
