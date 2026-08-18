const DEFAULT_NETWORK_DELAY_MS = 600;

export const simulateNetworkDelay = (ms: number = DEFAULT_NETWORK_DELAY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
