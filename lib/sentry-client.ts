
import { EventEmitter } from 'events'
import { Client } from 'raven'

export type CaptureCallback = (sendErr: Error | null | undefined, eventId: any) => void

export interface CaptureOptions {
  tags?: { [key: string]: string }
  extra?: { [key: string]: any }
  fingerprint?: string[]
  level?: string
  user?: any
}

export interface Instance extends EventEmitter {
  config(options?: Options): this
  config(dsn?: string | false, options?: Options): this
  captureMessage(message: string, cb?: CaptureCallback): string
  captureMessage(message: string, options?: CaptureOptions, cb?: CaptureCallback): string
}

export interface Options {
  name?: string
  logger?: string
  release?: string
  environment?: string
  tags?: { [key: string]: string }
  extra?: { [key: string]: any }
}

export const isSentryClient = (client: any): client is Instance =>
  client && client.captureMessage && typeof client.captureMessage === 'function'

export const createClient = (dsn?: string | false, options?: Options) => new Client(dsn, options) as Instance

export const useInstanceOrCreateClient = (input: string | Instance | Options): Instance =>
  isSentryClient(input) ? input : (typeof input === 'string' ? createClient(input) : createClient(false, input))
