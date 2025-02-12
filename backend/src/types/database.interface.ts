export interface IDatabaseConnection<connectionType = void, disconnectType = void> {
  disconnect(): Promise<disconnectType>;
}
