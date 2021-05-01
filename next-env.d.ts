/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    DETA_KEY: string
    SESSION_PASSWORD: string
  }
}
