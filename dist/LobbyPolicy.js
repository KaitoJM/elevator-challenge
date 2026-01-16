"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LobbyPolicy {
    shouldReturnToLobby(hasRiders, hour) {
        return hour < 12 && !hasRiders;
    }
}
exports.default = LobbyPolicy;
//# sourceMappingURL=LobbyPolicy.js.map