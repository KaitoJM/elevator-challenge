import MovementHistory from "../MovementHistory";
import RecordFloorHistoryContext from "./pipelines/contexts/RecordFloorHistory.context";
import AppendTrackPipe from "./pipelines/pipes/AppendNewTrack.pipe";
import MergeDropOffPipe from "./pipelines/pipes/MergeDropOff.pipe";
import SkipDuplicatePickupPipe from "./pipelines/pipes/SkipDuplicatePickup.pipe";
import SkipIdenticalLastTrackPipe from "./pipelines/pipes/SkipIdenticalLastTrack.pipe";
import RecordFloorHistory from "./pipelines/RecordFloorHistory.pipeline";

export default class RecordFloorHistoryService {
  process(context: RecordFloorHistoryContext): MovementHistory {
    const recorder = new RecordFloorHistory([
      new SkipDuplicatePickupPipe(),
      new SkipIdenticalLastTrackPipe(),
      new MergeDropOffPipe(),
      new AppendTrackPipe(),
    ]);

    return recorder.processRecord(context);
  }
}
