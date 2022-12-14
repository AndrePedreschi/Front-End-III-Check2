// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
//import { server } from './mocks/server.js'
import { expect, test, describe } from '@jest/globals';
import Navbar from "../Components/Navbar";
import { render, screen } from "@testing-library/react";
import Footer from '../Components/Footer';
import Login from '../Routes/Login';

describe("Navbar component", () => {

    /* test("É renderizado corretamente", () => {
        render(<Navbar theme={'Dark'}/>)

        const componente = screen.getByText("DH Odonto");
        expect(componente).toBeInTheDocument();

    }); */
    
    test("É renderizado corretamente", () => {
        render(<Footer theme={'Dark'}/>)

        const componente = screen.getByText("Voltar para o topo");
        expect(componente).toBeInTheDocument();

    });

    test("É renderizado corretamente", () => {
        render(<Login theme={'Dark'}/>)

        const componente = screen.getByText("Login Form");
        expect(componente).toBeInTheDocument();

    });
});




/* // Establish API mocking before all tests.
beforeAll(() => server.listen())
 */
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
/* afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

window.alert = ()=>{}
 */