import { useEffect, useState } from "react";

interface CountdownTimerProps {
    createdAt: string;
    durationSeconds: number;
}

export const CountdownTimer = ({ createdAt, durationSeconds }: CountdownTimerProps) => {
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const created = new Date(createdAt).getTime();
        const end = created + durationSeconds * 1000;

        const update = () => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((end - now) / 1000));
            setSecondsLeft(diff);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [createdAt, durationSeconds]);

    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;

    return (
        <>
            <h1 className="w-full text-center font-bold text-red-600">
                🕑{min}:{sec.toString().padStart(2, "0")}
            </h1>
        </>

    );
};