import Clock from "./Clock";
import LobbyPolicy from "./LobbyPolicy";
import Person from "./Person";
export default class Elevator {
    currentFloor: number;
    stops: number;
    floorsTraversed: number;
    requests: Array<Person>;
    riders: Array<Person>;
    clock: Clock;
    lobbyPolicy: LobbyPolicy;
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
    reset(): void;
}
//# sourceMappingURL=Elevator.d.ts.map