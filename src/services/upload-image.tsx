export const UploadProfileImage = async (id: number, imageFile: File) => {
    try {

        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('logo', imageFile);

        const response = await fetch(`http://localhost:3000/users/${id}/profile-picture`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.erro || 'Erro ao enviar imagem');
        }

        return await response.json();

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};