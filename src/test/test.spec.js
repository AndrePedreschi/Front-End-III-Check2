
import '@testing-library/jest-dom';
import { expect, test, describe } from '@jest/globals';
import Navbar from "../Components/Navbar";
import { render, screen, fireEvent, getByText } from './test-utils';
import Footer from '../Components/Footer';
import Login from '../Routes/Login';
import LoginForm from '../Components/LoginForm'

describe("Navbar component", () => {

    test("É renderizado corretamente", () => {

        render(<Navbar />)
        expect(screen.getByText("DH Odonto")).toBeInTheDocument()

    });

    test("Clicar no botão login é direcionado a página certa", () => {

        const { getByText } = render(<Navbar />)
        //expect(screen.getByText("DH Odonto")).toBeInTheDocument()
        const loginButton = getByText('Login')
        fireEvent.click(loginButton)

        setTimeout(() => {

            expect(getByText('Login Form')).toBeInTheDocument()

        }, 2000)
    });


});

describe("Footer component", () => {

    test("É renderizado corretamente", () => {

        render(<Footer />)
        expect(screen.getByText("Voltar para o topo")).toBeInTheDocument()

    });
});

describe("Login component", () => {

    test("É renderizado corretamente", () => {
        render(<Login />)
        expect(screen.getByText('Login Form')).toBeInTheDocument()
    });

    test('Fluxo de login', () => {

        const { getByText, getByPlaceholderText } = render(<LoginForm />)
        const input1 = getByPlaceholderText('Login')
        const input2 = getByPlaceholderText('Password')
        const submitButton = getByText('Enviar')

        fireEvent.change(input1, { target: { value: 'dentistaAdmin' } })
        fireEvent.change(input2, { target: { value: 'admin123' } })
        fireEvent.click(submitButton)

        setTimeout(() => {

            expect(getByText('Usuário logado com sucesso')).toBeInTheDocument()

        }, 2000)

    })
});


