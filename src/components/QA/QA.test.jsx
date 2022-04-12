import React from 'react';
import { render } from '@testing-library/react';
import QA from './QA';

describe('QA component', function() {
  it('should have a h3 displaying Questions and Answers', function() {
    let { getByText } = render(<QA productId={65631}/>);
    expect(getByText('Questions and Answers')).toMatchInlineSnapshot(`
      <h3>
        Questions and Answers
      </h3>
    `);
  });
});

