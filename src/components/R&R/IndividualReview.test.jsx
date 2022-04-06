import React from 'react';
import { render } from '@testing-library/react';
import IndividualReview from './IndividualReview.jsx';

describe('IndividualReview Component', function() {
  it('should contain a review name header', function () {
    let { getByText } = render(<IndividualReview />);
    expect(getByText('thinfootjim')).toMatchInlineSnapshot(`
    <div>
      thinfootjim
    </div>
    `);
  });
});