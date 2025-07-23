import { StyleStorePage } from "../types/types-style-store-page.d";

export const getPageStyle = async (storeId: number): Promise<StyleStorePage> => {
    try {
        const response = await fetch(`http://localhost:3000/store/style/${storeId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Erro ao buscar dados')
        }

        return data
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};

export const getMyPageStyle = async (): Promise<StyleStorePage> => {
    try {
        const response = await fetch(`http://localhost:3000/my-store/style`,
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
            throw new Error('Erro ao buscar dados')
        }

        return data
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};

export const updateMyPageStyle = async (style: {
    primaryColor: string;
    backgroundColor: string;
    textButtonColor: string;
}): Promise<StyleStorePage> => {
    try {
        const response = await fetch(`http://localhost:3000/my-store/style`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(style)
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Erro ao atualizar dados')
        }

        return data
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};