import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
// ...handlers - spread makes each element of the array a diferent argument
export const server = setupServer(...handlers)