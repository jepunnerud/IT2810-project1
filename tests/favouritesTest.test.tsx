import FavouritesPage from '../src/pages/Favourites';
import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { JSDOM } from 'jsdom';
import { act } from 'react-dom/test-utils'; // Import act
import { render } from '@testing-library/react'
import { QueryProvider } from './query-provider.tsx';
import { server } from './Handlers.tsx'


const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(globalThis.window as unknown) = window as unknown as Window & typeof globalThis;
globalThis.document = window.document;

// Mock localStorage
const mockLocalStorage = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
};

(globalThis as any).localStorage = mockLocalStorage;

describe('FavouritesPage', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    //localStorage.clear()
    container = document.createElement('div');
    document.body.appendChild(container);
    server.listen()


  });

  afterEach(() => {
    container.innerHTML = '';
    server.close()
    localStorage.clear
  });


  it('renders no card-holder components when localStorage is empty', async () => {
    const component = render(
      <QueryProvider>
        <FavouritesPage />
      </QueryProvider>
    );



    const cards = component.container.querySelectorAll('.card');
    expect(cards.length).toBe(0);

  });

  it('renders the list of favorite countries when isLoading is false', async () => {
    const storedFavourites = ['CAN']; // Modify this array as needed
    localStorage.setItem('favourites', JSON.stringify(storedFavourites));


    await act(async () => {
      const component = render(
        <QueryProvider>
          <FavouritesPage />
        </QueryProvider>
      );

      const cardContainer = component.queryByText('card');
      expect(cardContainer).toBeDefined();
    });
  });
});