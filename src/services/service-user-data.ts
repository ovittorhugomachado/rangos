export const userData = async () => {

    const response = await fetch('http://localhost:3000/user', {
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