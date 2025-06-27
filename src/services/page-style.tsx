import { AccountData } from "../types/account-types.d"

export const getPageStyle = async (): Promise<AccountData> => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/store-style`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Erro buscar dados')
        }

        return data
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