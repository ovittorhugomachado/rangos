import { LoginFormData } from "../types/login.d";

export const recoverPassword = async (credentials: LoginFormData) => {
    try {
        const response = await fetch('http://localhost:3000/recover-password', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
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