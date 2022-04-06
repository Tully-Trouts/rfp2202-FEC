import React from 'react';
import { render } from '@testing-library/react';
import QA from './QA';

describe('Q&A Component', function () {
  it('should have a Q&A header', function () {
    let { getByText } = render(<QA />);
    expect(getByText('Questions And Answers')).toMatchInlineSnapshot(`
      <h3>
        Questions And Answers
      </h3>
    `);
  });
});