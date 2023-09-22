import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act, render} from '@testing-library/react'
import HomePage from "../Home";
import { expect, test, vitest } from 'vitest';
import { QueryProvider } from "../../queryProvider";
import { mockCountries } from "./mocks/mockData";

vitest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: mockCountries,
  }),
}) as { useQuery: () => { data: any } });

// Declare the type of container explicitly
let container: HTMLDivElement;

// Common beforeEach function
beforeEach(async () => {
  // Clear mocks and add some testing data after before each test run
  console.log("setup kjører")
  container = document.createElement('div');
  document.body.appendChild(container);

  render(<HomePage />, container);

})

afterEach(async () => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
})

test('Home Page ', async () => {

// await act(async () => {
//   const component = render(
//     <QueryProvider >
//       <HomePage />
//     </QueryProvider>
//   )
// })
  
  // Use the beforeEach function to set up the environment
  console.log("test kjører 1")
  console.log("test kjører 2")

  // Add your assertions here to verify that the search input and sorting dropdown are rendered.
  // expect(container.querySelector('#input')).not.toBeNull(); // Replace with the actual selector for the search input.
  // expect(container.querySelector('#sorting-parameter')).not.toBeNull(); // Replace with the actual selector for the sorting dropdown.
  console.log("test kjører 3")
  // Use the afterEach function to clean up after the test

  console.log("test kjører 4")
});


