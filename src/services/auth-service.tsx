import { AccountData } from "../types/account-types.d";

export const login = async (credentials: AccountData) => {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login')
        }

        return data;

    } catch (error) {

        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
}

export const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include',  // importante para enviar cookies
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer logout');
        }

        return data;

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};