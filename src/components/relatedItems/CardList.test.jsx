import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CardList';

const server = setupServer(
  rest.get('api/products/*/related', (req, res, ctx) => {
    return res(ctx.json(
      {
        data: [65636, 65636, 65638, 65639, 65631, 65633]
      }
    ));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resethandlers());
afterAll(() => server.close());

test('gets all related productIds', async () => {
  render(<CardList />)


})