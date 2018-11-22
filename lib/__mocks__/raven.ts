
let createClient: any = () => (): any => null
export const setMockCreateClient = (mock: any) => createClient = mock

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
