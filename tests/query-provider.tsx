// query-provider.tsx
import { FC, PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
}

//export const apiKey = import.meta.env.country as string

/*
import FavouritesPage from '../src/pages/Favourites';
import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import ReactDOM from 'react-dom';
import { JSDOM } from 'jsdom';
import { setUseCountriesMock } from '../src/hooks/Countries'; // Update the import path
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import { act } from 'react-dom/test-utils'; // Import act
import {render} from '@testing-library/react'
import { QueryProvider } from '../src/query-provider';




const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(globalThis.window as unknown) = window as unknown as Window & typeof globalThis;
globalThis.document = window.document;

//let queryClient: QueryClient;
//let wrapper: HTMLDivElement;

// Mock localStorage
const mockLocalStorage = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
};

// Create a global variable for localStorage
(globalThis as any).localStorage = mockLocalStorage;

describe('FavouritesPage', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    //queryClient = new QueryClient();


    //wrapper = document.createElement('div');
    //document.body.appendChild(wrapper);
/*
    act(() => { // Wrap rendering in act
      ReactDOM.render(
        <QueryClientProvider client={queryClient}>
          <FavouritesPage />
        </QueryClientProvider>,
        container
      );
    });
  });
*/

/*
  afterEach(() => {
    // Clean up the container after each test
    container.innerHTML = '';
    //wrapper.innerHTML = '';

  });


  it('renders loading spinner when isLoading is true', async () => {

    await act(async () => {

      // Mock isLoading as true
      setUseCountriesMock(() => ({
        data: [],
        isLoading: true,
      }));
    });

    const component = render(
      <QueryProvider>
        <FavouritesPage />
      </QueryProvider>,
    );

    expect(component).toContain('loader');

  });

  it('renders the list of favorite countries when isLoading is false', async () => {
    await act(async () => {
      setUseCountriesMock(() => ({
        data: [
          {
            cca3: 'CAN',
            name: 'Canada',
          },
        ],
        isLoading: false,
      }));
    });
    expect(container.innerHTML).toContain('card-container')
    expect(container.innerHTML).toContain('Canada') // You can add more expectations here
  });
});

*/


/*
import FavouritesPage from '../src/pages/Favourites';
import { expect, it, describe, beforeEach, afterEach,vi, test, assert } from "vitest";
import ReactDOM from 'react-dom';
import { JSDOM } from 'jsdom';
import {render} from '@testing-library/react'
import { setUseCountriesMock } from '../src/hooks/Countries'; // Update the import path
import { QueryProvider } from '../query-provider.tsx'
//import { setupWorker, rest } from 'msw'


// Mock localStorage
const mockLocalStorage = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
};


beforeEach(() => {
  // ...
});

afterEach(() => {
  // ...
});


describe('FavouritesPage', () => {

  //Mocks the api
  const fn=vi.fn()
  global.fetch=fn

  it('renders loading spinner when isLoading is true', async () => {
    // Mock isLoading as true
    setUseCountriesMock(() => ({
      data: [],
      isLoading: true,
    }));
    expect(container.innerHTML).toContain('loader');
  });

  const component = render(
    <QueryProvider>
      <FavouritesPage />
    </QueryProvider>,
  );

  expect(component.isLoading).toBeTruthy()
  expect(fn).toHaveBeenCalled()


  it('renders the list of favorite countries when isLoading is false', async () => {
    setUseCountriesMock(() => ({
      data: [
        {
          cca3: 'CAN',
          name: 'Canada',
        },
      ],
      isLoading: false,
    }));
  });

  expect(container).toContain('card-container')
  expect(container).toContain('Canada')


});


*/




