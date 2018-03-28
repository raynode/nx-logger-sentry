
import { configure, create } from '@raynode/nx-logger'
import * as faker from 'faker'

import * as loggly from './__mocks__/raven'
import { createTransport, Instance } from './log-sentry'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50

const { setMockCreateClient } = loggly

describe('createTransport', () => {
  it('should create a loggly client and return a transport', () => {
    let called = false
    setMockCreateClient(() => called = true)
    const transport = createTransport({} as any)
    expect(typeof transport).toEqual('function')
    expect(called).toBeTruthy()
  })

  it('should call the returned transport if setup as a transport', () => {
    let last = null
    const msg = faker.random.word()
    const namespace = faker.random.words(10).split(' ')
    setMockCreateClient(() => ({ captureMessage: (...args) => last = args }))
    const transport = createTransport({} as any)
    const log = create({ namespace, transport })
    log(msg)
    expect(last).toHaveLength(2)
    expect(last[0]).toEqual(msg)
    expect(last[1].tags.namespace).toEqual(namespace.join(','))
  })

  it('should work when we supply our own loggly client', () => {
    let called = false
    const namespace = faker.random.words(10).split(' ')
    const mockMsg = faker.random.words()
    const mockClient: Instance = { captureMessage: (msg: string, config?: any) => {
      expect(msg).toBe(mockMsg)
      expect(config.tags.namespace).toEqual(namespace.join(','))
      called = true
    }} as any
    const transport = createTransport(mockClient)
    const log = create({ namespace, transport })
    log(mockMsg)
    expect(called).toBeTruthy()
  })
})
