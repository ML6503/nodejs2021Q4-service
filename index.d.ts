declare namespace NodeJS {
  interface Process {
    env: { [key: string]: string };
  }
}

declare global {
  namespace NodeJS {
    interface Process {
      env: { [key: string]: string };
    }
  }
}
export {};
