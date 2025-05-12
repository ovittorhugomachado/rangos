interface LoginCredentials {
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        console.log(response.status)
        if (response.status == 401) {
            throw new Error("Usuário não encontrado")
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login')
        }

        const data = await response.json();
        return data;

    } catch {
        throw new Error('Erro ao se conectar com o servidor');
    }

}