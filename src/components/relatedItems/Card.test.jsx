import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitfor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

const server = setupServer(
  rest.get(`api/products/*`, (req, res, ctx) => {
    return res(ctx.json(
      {
        data: {
          'category': 'Kicks',
          'name': 'Pumped Up Kicks',
        }
      }
    ));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('display category', async () => {
  render(<Card />)

  await screen.findByText('Kicks');

});
