export const getCategoriesStore = async () => {

    const response = await fetch('http://localhost:3000/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar categorias do menu');
    };

    return await response.json();
};

export const deleteCategoryService = async (categoryId: number) => {
    const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao deletar categoria do menu');
    };

    return await response.json();
};