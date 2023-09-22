import HomePage from "../src/pages/Home";
import { expect, it, describe, beforeEach, afterEach } from "vitest";
import { JSDOM } from 'jsdom';
import { render } from '@testing-library/react'
import { QueryProvider } from "./query-provider";
import { server } from "./Handlers";


const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(globalThis.window as unknown) = window as unknown as Window & typeof globalThis;
globalThis.document = window.document;


describe('FavouritesPage', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    server.listen()
  });

  afterEach(() => {
    container.innerHTML = '';
    server.close()
  });


  it('render countryCard components on the homepage', async () => {
    const component = render(
      <QueryProvider>
        <HomePage />
      </QueryProvider>
    );

    const cardContainer = component.queryByText('card');
    expect(cardContainer).toBeDefined();
  });
});

