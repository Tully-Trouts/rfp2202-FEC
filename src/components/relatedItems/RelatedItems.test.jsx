import React from 'react';
import { render } from '@testing-library/react';
import RelatedItems from './RelatedItems';


describe('RelatedItems component', function () {
  it('should have a related products header', function () {
    let { getByText } = render(<RelatedItems />);
    expect(getByText('RELATED PRODUCTS')).toMatchInlineSnapshot(`
      <h5>
        RELATED PRODUCTS
      </h5>
    `);
  });
});
