import React from 'react';
import { render } from '@testing-library/react';
import RelatedItems from './RelatedItems.jsx';


describe("RelatedItems component", function () {
  it("should have a hello world message", function () {
    let { getByText } = render(<RelatedItems />);
    expect(getByText("hello world React!")).toMatchInlineSnapshot(`
      <h1>
        hello world React!
      </h1>
    `);
  });
});
