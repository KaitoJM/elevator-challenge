import Clock from "./app/Clock";
import LobbyPolicy from "./LobbyPolicy";
import MovementHistory from "./MovementHistory";
import Person from "./Person";
export default class Elevator {
    currentFloor: number;
    stops: number;
    floorsTraversed: number;
    requests: Array<Person>;
    riders: Array<Person>;
    clock: Clock;
    lobbyPolicy: LobbyPolicy;
    floorMovementHistory: MovementHistory;
    stoppedFlag: boolean;
    activePerson: Person | null;
    constructor(clock: Clock, lobbyPolicy?: LobbyPolicy);
    dispatch(): void;
    handleRequest(person: Person): void;
    moveToFloor(targetFloor: number): void;
    moveUp(): void;
    moveDown(): void;
    onMove(): void;
    pickup(person: Person): void;
    dropOff(person: Person): void;
    hasStop(): boolean;
    hasPickup(): boolean;
    hasDropOff(): boolean;
    handleIdleState(): void;
    recordTrack(): void;
    reset(): void;
}
//# sourceMappingURL=Elevator.d.ts.map