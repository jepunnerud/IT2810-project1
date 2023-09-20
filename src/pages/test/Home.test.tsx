import ReactDOM, { render } from "react-dom";
import HomePage from "../Home";
import { expect, it, test } from 'vitest'

test('Home Page ', () => {
    it('renders the search input and sorting dropdown', () => {
        const container = document.createElement('div'); // Create a container element
        document.body.appendChild(container); // Append it to the document

        render(<HomePage />, container);

        expect(container.querySelector('.input')).not.toBeNull();
        expect(container.querySelector('#sorting-parameter')).not.toBeNull();

        // Clean up after the test
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
    });
})
