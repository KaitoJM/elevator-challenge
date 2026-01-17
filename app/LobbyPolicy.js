export default class LobbyPolicy {
  shouldReturnToLobby(hasRiders, hour) {
    return hour < 12 && !hasRiders;
  }
}
