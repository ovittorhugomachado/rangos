import { OpeningHour } from "../types/types-schedules.d";

export const updateSchedules = async (body: { schedule: OpeningHour[] }) => {
    const response = await fetch('http://localhost:3000/schedules', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar horários');
    };

    return await response.json();   
};