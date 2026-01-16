export default class LobbyPolicy {
  shouldReturnToLobby(hasRiders: boolean, hour: number): boolean {
    return hour < 12 && !hasRiders;
  }
}
