import AppendTrackPipe from "./pipelines/pipes/AppendNewTrack.pipe.js";
import MergeDropOffPipe from "./pipelines/pipes/MergeDropOff.pipe.js";
import SkipDuplicatePickupPipe from "./pipelines/pipes/SkipDuplicatePickup.pipe.js";
import SkipIdenticalLastTrackPipe from "./pipelines/pipes/SkipIdenticalLastTrack.pipe.js";
import RecordFloorHistory from "./pipelines/RecordFloorHistory.pipeline.js";

export default class RecordFloorHistoryService {
  process(context) {
    const recorder = new RecordFloorHistory([
      new SkipDuplicatePickupPipe(),
      new SkipIdenticalLastTrackPipe(),
      new MergeDropOffPipe(),
      new AppendTrackPipe(),
    ]);

    return recorder.processRecord(context);
  }
}
