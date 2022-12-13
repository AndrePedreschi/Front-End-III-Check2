// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
//import { server } from './mocks/server.js'
//import { expect, test, describe } from '@jest/globals';
import Navbar from "./src/Components/Navbar";
import { render, screen } from "@testing-library/react";



/* // Establish API mocking before all tests.
beforeAll(() => server.listen())
 */

describe("Navbar component", () => {

    test("É renderizado corretamente", ()=>{
        render(<Navbar />)
        const componente = screen.getByText(
            "DH Odonto"
        );
        expect(componente).toBeInTheDocument();
    });
    /* test('Deveria ser renderizado em tela', () => {
        const { getByText } = render(<Navbar />)
        expect(getByText('DH Odonto')).toBeInTheDocument()

    }) */

    /* it('Fluxo cadastro', () => {

        const { getByLabelText, getByText } = render(<DecimaQuintaAula />)
        const input = getByLabelText('cep')
        const submitButton = getByLabelText('submit-button')

        fireEvent.change(input, { target: { value: '01315000' } })
        fireEvent.click(submitButton)

        setTimeout(() => {

            expect(getByText('Cep: 01315-000')).toBeInTheDocument()

        }, 2000)

    }) */

});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
/* afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

window.alert = ()=>{}
 */