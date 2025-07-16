import { AccountData } from "../types/types-account.d";

export const getStoreData = async () => {
    const response = await fetch('http://localhost:3000/store', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar dados do usuário');
    };

    return await response.json();   
};

export const updateStoreData = async (data: AccountData) => {
    const response = await fetch('http://localhost:3000/store', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar dados do usuário');
    };

    return await response.json();   
};