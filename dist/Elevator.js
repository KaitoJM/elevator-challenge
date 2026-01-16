"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clock_1 = __importDefault(require("./Clock"));
const LobbyPolicy_1 = __importDefault(require("./LobbyPolicy"));
class Elevator {
    constructor(clock, lobbyPolicy) {
        this.currentFloor = 0;
        this.stops = 0;
        this.floorsTraversed = 0;
        this.requests = [];
        this.riders = [];
        this.clock = clock || new Clock_1.default();
        this.lobbyPolicy = lobbyPolicy || new LobbyPolicy_1.default();
    }
    dispatch() {
        while (this.requests.length > 0) {
            const person = this.requests[0];
            this.handleRequest(person);
        }
        this.handleIdleState();
    }
    handleRequest(person) {
        this.moveToFloor(person.currentFloor);
        this.pickup(person);
        this.moveToFloor(person.dropOffFloor);
        this.dropOff(person);
    }
    moveToFloor(targetFloor) {
        while (this.currentFloor !== targetFloor) {
            this.currentFloor < targetFloor ? this.moveUp() : this.moveDown();
        }
    }
    moveUp() {
        this.currentFloor++;
        this.onMove();
    }
    moveDown() {
        if (this.currentFloor === 0)
            return;
        this.currentFloor--;
        this.onMove();
    }
    onMove() {
        this.floorsTraversed++;
        if (this.hasStop()) {
            this.stops++;
        }
    }
    pickup(person) {
        this.riders.push(person);
        this.requests.shift();
    }
    dropOff(person) {
        this.riders = this.riders.filter((r) => r !== person);
    }
    hasStop() {
        return this.hasPickup() || this.hasDropOff();
    }
    hasPickup() {
        return this.requests.some((r) => r.currentFloor === this.currentFloor);
    }
    hasDropOff() {
        return this.riders.some((r) => r.dropOffFloor === this.currentFloor);
    }
    handleIdleState() {
        const hour = this.clock.getHour();
        if (this.lobbyPolicy.shouldReturnToLobby(this.riders.length > 0, hour)) {
            this.moveToFloor(0);
        }
    }
    reset() {
        this.currentFloor = 0;
        this.stops = 0;
        this.floorsTraversed = 0;
        this.requests = [];
        this.riders = [];
    }
}
exports.default = Elevator;
//# sourceMappingURL=Elevator.js.map