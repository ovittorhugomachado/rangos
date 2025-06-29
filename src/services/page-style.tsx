import { AccountData } from "../types/account-types.d"

export const getPageStyle = async (): Promise<AccountData> => {
    try {
        //const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/store/style`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Erro buscar dados')
        }

        return data
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
}