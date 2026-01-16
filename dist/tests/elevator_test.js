"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Elevator_1 = __importDefault(require("../Elevator"));
const Person_1 = __importDefault(require("../Person"));
const chai = __importStar(require("chai"));
const { assert } = chai;
class FakeClock {
    getHour() {
        return 10; // always before noon
    }
}
describe("Elevator", () => {
    let elevator;
    beforeEach(() => {
        elevator = new Elevator_1.default(new FakeClock());
    });
    it("should bring a rider to a floor above their current floor", () => {
        const rider = new Person_1.default("Brittany", 2, 5);
        elevator.requests.push(rider);
        elevator.dispatch();
        assert.equal(elevator.currentFloor, 0);
        assert.equal(elevator.floorsTraversed, 10);
        assert.equal(elevator.stops, 2);
    });
    it("should bring a rider to a floor below their current floor", () => {
        const rider = new Person_1.default("Brittany", 8, 3);
        elevator.requests.push(rider);
        elevator.dispatch();
        assert.equal(elevator.currentFloor, 0);
        assert.equal(elevator.floorsTraversed, 16);
        assert.equal(elevator.stops, 2);
    });
});
//# sourceMappingURL=elevator_test.js.map