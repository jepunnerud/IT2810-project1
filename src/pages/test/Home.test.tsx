import { render, unmountComponentAtNode } from "react-dom";
import HomePage from "../Home";
import { expect, it, test } from 'vitest'

test('Home Page ', () => {
    it('renders the search input and sorting dropdown', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        render(<HomePage />, container);

        expect(container.querySelector('.input')).not.toBeNull();
        expect(container.querySelector('#sorting-parameter')).not.toBeNull();

        unmountComponentAtNode(container);
        document.body.removeChild(container);
    });
})
