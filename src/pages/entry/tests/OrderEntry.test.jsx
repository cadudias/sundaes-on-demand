import { render, screen, waitFor } from "@testing-library/react"
import OrderEntry from "../OrderEntry"

import { rest } from 'msw'
import { server } from "../../../mocks/server"
test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers([
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    ),]
  );

  render(<OrderEntry />)

  await waitFor( () => {
    const alerts = screen.getAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });

  // alerts will appear assincronouysly, they will only appear on the cactch
})
