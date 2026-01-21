export {};

declare global {
  interface Window {
    plausible?: (...args: any[]) => void;
  }
}
