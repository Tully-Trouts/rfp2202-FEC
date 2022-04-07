import React from 'react';
import CartSelector from '../CartSelector';

// Need a virtual DOM to render our component into, this is supplied by testing-library:
//  usually only the render method is imported here using destructuring i.e. { render }
import { render } from '@testing-library/react';

// Perhaps optional, but importing the keyword "expect" here:
import '@testing-library/jest-dom';

// I want to make a test that checks to see if a quantity select element has been rendered
// Other tests:
//
//

// We need to specify a test using the 'test' keyword
//  this function takes in two paramenters, a string describing the test
//  and a function containing the logic for the test
test('Quantity select element renders with "-" as the current selection', () => {
  // First thing we need to do is render the component (to a virtual DOM)
  const component = render(<CartSelector />);

  // Next we want to check if the component contains a select element for quantity
  //  By using getByRole we can search for the element based on its accesible name
  //  (specified in the name option). this method therefore emulates
  //  accesible use and is generally going to be the best choice for querying
  //  see https://testing-library.com/docs/queries/about#priority for query suggestions
  //    Using a regex literal (case insensitive flag) to search for the name
  //    of a 'listbox' which is the ARIA/semantic role name of a 'select' element
  //    containing options.

  //component.getByRole('listbox', {name: /quantity/i}); // This line is called a query

  // Lets assign the return value of the query to a variable so we can assert over it:
  const quantityList = component.getByRole('listbox', {name: 'quantity'});

  // checking if the 'text content' of our matched query is '-'
  expect(quantityList.textContent).toBe('-');
});

// if we import 'screen' we can use it to query the entire document.body
import { screen } from '@testing-library/dom';

test('Size select element renders with "Select Size" as the initial text', () => {

  // getting a query from the screen/document.body:
  const sizeList = screen.getByRole('listbox', {name: 'size'});

  // now lets assert over the results of the query:
  expect(sizeList.textContent).toBe('Select Size');
});

