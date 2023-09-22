import ReactDOM, { render } from "react-dom";
import HomePage from "../Home";
import { expect, test, vitest } from 'vitest'
import { mockCountries } from "./mocks/mockData";



vitest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: mockCountries,
  }),
}) as { useQuery: () => { data: any } });

// Declare the type of container explicitly
let container: HTMLDivElement;

// Common beforeEach function
const beforeEach = () => {
  console.log("setup kjører")
  // Create a new container element for each test
  container = document.createElement('div');
  document.body.appendChild(container);

  // Render the HomePage component into the container
  render(<HomePage />, container);
};

// Common afterEach function
const afterEach = () => {
  // Clean up after the test
  ReactDOM.unmountComponentAtNode(container);
  document.body.removeChild(container);
};

test('Home Page ', () => {
  // Use the beforeEach function to set up the environment
  console.log("test kjører 1")
  beforeEach();
  console.log("test kjører 2")

  // Add your assertions here to verify that the search input and sorting dropdown are rendered.
  expect(container.querySelector('.input')).not.toBeNull(); // Replace with the actual selector for the search input.
  expect(container.querySelector('#sorting-parameter')).not.toBeNull(); // Replace with the actual selector for the sorting dropdown.
  console.log("test kjører 3")
  // Use the afterEach function to clean up after the test
  afterEach();

  console.log("test kjører 4")
});


