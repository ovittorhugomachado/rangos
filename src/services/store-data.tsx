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
}