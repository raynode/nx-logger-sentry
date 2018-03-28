
let createClient = () => () => null
export const setMockCreateClient = mock => createClient = mock

export class Client {
  private mock: any

  public constructor() {
    this.mock = createClient()
  }
  public captureMessage(...args: any[]) {
    return this.mock.captureMessage(...args)
  }
}

const raven = {
  Client,
  createClient: () => createClient(),
  setMockCreateClient,
}

export { createClient }

module.exports = raven
