
import { formatMessage, TransportFn } from '@raynode/nx-logger'
import { createClient, Instance, Options, useInstanceOrCreateClient } from './sentry-client'

export { Options, Instance }

export const createTransport = (options: string | Options | Instance): TransportFn => {
  const client = useInstanceOrCreateClient(options)
  return (configuration, messages) =>
    client.captureMessage(formatMessage(messages), {
      tags: {
        namespace: configuration.namespace.join(','),
      },
    })
}
