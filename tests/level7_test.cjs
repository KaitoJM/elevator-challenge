const assert = require("chai").assert;
const ElevatorController = require("../app/ElevatorController").default;
const Elevator = require("../app/Elevator").default;
const Person = require("../app/Person").default;
const SkipDuplicatePickupPipe =
  require("../app/services/pipelines/pipes/SkipDuplicatePickup.pipe").default;
const SkipIdenticalLastTrackPipe =
  require("../app/services/pipelines/pipes/SkipIdenticalLastTrack.pipe").default;
const MergeDropOffPipe =
  require("../app/services/pipelines/pipes/MergeDropOff.pipe").default;
const AppendTrackPipe =
  require("../app/services/pipelines/pipes/AppendNewTrack.pipe").default;
const RecordFloorHistoryContext =
  require("../app/services/pipelines/contexts/RecordFloorHistory.context").default;
const MovementHistory = require("../app/MovementHistory").default;

class FakeClock {
  hour;

  constructor(hour = 10) {
    this.hour = hour;
  }

  getHour() {
    return this.hour;
  }
}

describe("Level 7: Added Feature Test (Floor history tracking)", () => {
  let controller;

  beforeEach(() => {
    controller = new ElevatorController(new FakeClock(10));
  });

  it("can track floor history", () => {
    const personA = new Person("PersonA", 3, 5);
    const personB = new Person("PersonB", 7, 8);

    controller.requests.push(personA);
    controller.requests.push(personB);

    controller.dispatch();

    const tracking = controller.floorMovementHistory.getData();
    assert.equal(tracking[0].floor, 1);
    assert.equal(tracking[1].floor, 2);
    assert.equal(tracking[2].floor, 3);
    assert.equal(tracking[3].floor, 4);
    assert.equal(tracking[4].floor, 5);
    assert.equal(tracking[5].floor, 6);
    assert.equal(tracking[6].floor, 7);
    assert.equal(tracking[7].floor, 8);
    assert.equal(tracking[8].floor, 7);
    assert.equal(tracking[9].floor, 6);
    assert.equal(tracking[10].floor, 5);
    assert.equal(tracking[11].floor, 4);
    assert.equal(tracking[12].floor, 3);
    assert.equal(tracking[13].floor, 2);
    assert.equal(tracking[14].floor, 1);
    assert.equal(tracking[15].floor, 0);

    assert.equal(tracking[2].personName, "PersonA");
    assert.equal(tracking[3].personName, "PersonA");
    assert.equal(tracking[4].personName, "PersonA");
    assert.equal(tracking[6].personName, "PersonB");
    assert.equal(tracking[7].personName, "PersonB");

    assert.equal(tracking[2].stopped, true);
    assert.equal(tracking[4].stopped, true);
    assert.equal(tracking[6].stopped, true);
    assert.equal(tracking[7].stopped, true);
  });
});

describe("Level 7: Pipe - SkipDuplicatePickupPipe", () => {
  let pipe;

  beforeEach(() => {
    pipe = new SkipDuplicatePickupPipe();
  });

  it("should stop if the current floor matches the first onboarding person and no active person", () => {
    const context = new RecordFloorHistoryContext(
      null, // no active person
      new MovementHistory(),
      [new Person("Alice", 2, 5)], // onBoarding array
      2, // currentFloor
      false
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "stop");
  });

  it("should continue if there is an active person", () => {
    const context = new RecordFloorHistoryContext(
      new Person("Bob", 2, 5), // active person present
      new MovementHistory(),
      [new Person("Alice", 2, 5)], // onBoarding array
      2, // currentFloor
      false
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });

  it("should continue if onBoarding is empty", () => {
    const context = new RecordFloorHistoryContext(
      null, // no active person
      new MovementHistory(),
      [], // empty onboarding
      2,
      false
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });

  it("should continue if current floor does not match first onboarding person", () => {
    const context = new RecordFloorHistoryContext(
      null,
      new MovementHistory(),
      [new Person("Alice", 5, 10)],
      2, // currentFloor does NOT match Alice
      false
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });
});

describe("Level 7: Pipe - SkipIdenticalLastTrackPipe", () => {
  let pipe;

  beforeEach(() => {
    pipe = new SkipIdenticalLastTrackPipe();
  });

  it("should continue if lastTrack is null", () => {
    const context = new RecordFloorHistoryContext(
      new Person("Alice", 2, 5),
      new MovementHistory(),
      [],
      2,
      true
    );

    // explicitly set lastTrack to null
    context.lastTrack = null;

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });

  it("should continue if person is null", () => {
    const context = new RecordFloorHistoryContext(
      null, // no active person
      new MovementHistory(),
      [],
      2,
      true
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });

  it("should stop if currentFloor, person, and stoppedFlag match lastTrack", () => {
    const history = new MovementHistory();
    history.pushTrack(2, "Alice", true); // lastTrack

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 2, 5),
      history,
      [],
      2,
      true
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "stop");
  });

  it("should continue if currentFloor does not match lastTrack", () => {
    const history = new MovementHistory();
    history.pushTrack(3, "Alice", true);

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 2, 5),
      history,
      [],
      2,
      true
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });

  it("should continue if person name does not match lastTrack", () => {
    const history = new MovementHistory();
    history.pushTrack(2, "Bob", true);

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 2, 5),
      history,
      [],
      2,
      true
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });

  it("should continue if stoppedFlag does not match lastTrack", () => {
    const history = new MovementHistory();
    history.pushTrack(2, "Alice", false);

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 2, 5),
      history,
      [],
      2,
      true
    );

    const result = pipe.handle(context);

    assert.equal(result.type, "continue");
  });
});

describe("Level 7: Pipe - MergeDropOffPipe", () => {
  let pipe;

  beforeEach(() => {
    pipe = new MergeDropOffPipe();
  });

  it("should continue if lastTrack is null", () => {
    const history = new MovementHistory();
    const context = new RecordFloorHistoryContext(
      new Person("Alice", 2, 5),
      history,
      [],
      2,
      true
    );

    context.lastTrack = null;

    const result = pipe.handle(context);
    assert.equal(result.type, "continue");
  });

  it("should stop and update stoppedFlag if currentFloor matches lastTrack and stoppedFlag is different", () => {
    const history = new MovementHistory();
    history.pushTrack(3, "Alice", false); // last track

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 3, 5),
      history,
      [],
      3,
      true // different stoppedFlag
    );

    const result = pipe.handle(context);
    assert.equal(result.type, "stop");

    const updatedTrack = context.history.getData()[0];
    assert.equal(updatedTrack.stopped, true, "stoppedFlag should be updated");
  });

  it("should continue if currentFloor does not match lastTrack.floor", () => {
    const history = new MovementHistory();
    history.pushTrack(2, "Alice", false);

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 3, 5),
      history,
      [],
      3,
      true
    );

    const result = pipe.handle(context);
    assert.equal(result.type, "continue");
  });

  it("should continue if stoppedFlag is the same as lastTrack", () => {
    const history = new MovementHistory();
    history.pushTrack(3, "Alice", true);

    const context = new RecordFloorHistoryContext(
      new Person("Alice", 3, 5),
      history,
      [],
      3,
      true // same as lastTrack
    );

    const result = pipe.handle(context);
    assert.equal(result.type, "continue");
  });
});

describe("Level 7: Pipe - AppendTrackPipe", () => {
  let pipe;

  beforeEach(() => {
    pipe = new AppendTrackPipe();
  });

  it("should append a new track and return stop", () => {
    const history = new MovementHistory();
    const person = new Person("Alice", 2, 5);

    const context = new RecordFloorHistoryContext(
      person,
      history,
      [],
      3, // currentFloor
      true // stoppedFlag
    );

    const result = pipe.handle(context);

    // Check that the pipe returned stop
    assert.equal(result.type, "stop");

    // Check that history has one track
    const tracks = context.history.getData();
    assert.equal(tracks.length, 1);

    const track = tracks[0];
    assert.equal(track.floor, 3);
    assert.equal(track.personName, "Alice");
    assert.equal(track.stopped, true);
  });
});
