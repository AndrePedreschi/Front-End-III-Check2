import '@testing-library/jest-dom';
import { expect, test, describe } from '@jest/globals';
import Navbar from "../Components/Navbar";
import { render, screen, fireEvent } from './test-utils';
import Footer from '../Components/Footer';
import Login from '../Routes/Login';
import LoginForm from '../Components/LoginForm'
import DetailCard from '../Components/DetailCard'


describe("Navbar component", () => {

    test("É renderizado corretamente", () => {

        render(<Navbar />)
        expect(screen.getByText("DH Odonto")).toBeInTheDocument()

    });

    test("Clicar no botão login é direcionado a página de login", () => {

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

describe("Tentar agendar sem estar logado", () => {
    test('Fluxo de agendamento', () => {
        const { getByText, getByPlaceholderText } = render(<DetailCard />)
        const submitButton = getByText('Marcar consulta')
        fireEvent.click(submitButton)
        setTimeout(() => {
            expect(findByText('Realize o login antes de cadastrar uma consulta!')).toBeInTheDocument()
        }, 2000)
    })
})

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

describe("Tentar agendar estando logado", () => {
    test('Fluxo de login e cadastro de consulta', () => {

        const { getByText, getByPlaceholderText } = render(<LoginForm />)
        const input1 = getByPlaceholderText('Login')
        const input2 = getByPlaceholderText('Password')
        const submitButton = getByText('Enviar')

        fireEvent.change(input1, { target: { value: 'dentistaAdmin' } })
        fireEvent.change(input2, { target: { value: 'admin123' } })
        fireEvent.click(submitButton)

        setTimeout(() => {

            const { getByText } = render(<DetailCard />)
            const submitButton = getByText('Marcar consulta')
            fireEvent.click(submitButton)
            setTimeout(() => {
                expect(findByText('Selecione o dentista, paciente e a data e hora')).toBeInTheDocument()
            }, 2000)
        }, 2000);
    })
})
