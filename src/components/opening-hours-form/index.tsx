import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";



type DayOfWeek = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

interface TimeRange {
    open: string;
    close: string;
}

interface DaySchedule {
    status: 'open' | 'closed';
    timeRanges: TimeRange[];
}

export const OpeningHoursForm = () => {
    const [schedule, setSchedule] = useState<Record<DayOfWeek, DaySchedule>>({

        seg: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
        ter: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
        qua: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
        qui: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
        sex: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
        sab: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
        dom: { status: 'open', timeRanges: [{ open: '08:00', close: '18:00' }] },
    });

    const dayNames: Record<DayOfWeek, string> = {
        dom: 'DOMINGO',
        seg: 'SEGUNDA',
        ter: 'TERÇA',
        qua: 'QUARTA',
        qui: 'QUINTA',
        sex: 'SEXTA',
        sab: 'SÁBADO'
    };

    const handleStatusChange = (day: DayOfWeek, value: 'open' | 'closed') => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                status: value,
                timeRanges: value === 'open' && prev[day].timeRanges.length === 0
                    ? [{ open: '08:00', close: '18:00' }]
                    : prev[day].timeRanges
            }
        }));
    };

    const handleTimeChange = (day: DayOfWeek, rangeIndex: number, field: 'open' | 'close', value: string) => {
        setSchedule(prev => {
            const newTimeRanges = [...prev[day].timeRanges];
            newTimeRanges[rangeIndex] = {
                ...newTimeRanges[rangeIndex],
                [field]: value
            };

            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    timeRanges: newTimeRanges
                }
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Horários enviados:', schedule);
    };

    const addHourOpenAndClosed = (day: DayOfWeek) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                timeRanges: [...prev[day].timeRanges, { open: '08:00', close: '18:00' }]
            }
        }));
    };

    const removeTimeRange = (day: DayOfWeek, index: number) => {
        setSchedule(prev => {
            const newTimeRanges = [...prev[day].timeRanges];
            newTimeRanges.splice(index, 1);

            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    timeRanges: newTimeRanges
                }
            };
        });
    };

    return (
        <form className="bg-white text-black w-[90%] max-w-[500px] flex flex-col items-center gap-3.5 primary-component py-8" id="hoursForm" onSubmit={handleSubmit}>
            <h1 className="text-lg text-center mx-1.5 border-b-2 border-primary">Horários de funcionamento</h1>
            {(Object.keys(schedule) as DayOfWeek[]).map((day) => (
                <div key={day} className="w-[90%] border-b-[1px] border-gray-400 p-3 mx-3 flex flex-col items-center gap-2" id={`${day}-container`}>
                    <div className="font-bold">{dayNames[day]}</div>
                    <div className="flex gap-2">
                        <label className="flex items-center gap-0.5">
                            <input
                                type="radio"
                                name={`${day}_status`}
                                value="closed"
                                checked={schedule[day].status === 'closed'}
                                onChange={(e) => handleStatusChange(day, e.target.value as 'open' | 'closed')}
                            />
                            Fechado
                        </label>
                        <label className="flex items-center gap-0.5">
                            <input
                                type="radio"
                                name={`${day}_status`}
                                value="open"
                                checked={schedule[day].status === 'open'}
                                onChange={(e) => handleStatusChange(day, e.target.value as 'open' | 'closed')}
                            />
                            Aberto
                        </label>
                    </div>

                    {schedule[day].status === 'open' && (
                        <div className="w-full flex flex-col items-center gap-2">
                            {schedule[day].timeRanges.map((range, index) => (
                                <div key={index} className="flex relative pr-4">
                                    <div className="flex flex-col w-[190px] gap-2 items-center justify-center">
                                        <label className="flex items-center justify-between w-full gap-1">
                                            Abertura:
                                            <input
                                                type="time"
                                                className="border p-1 rounded w-[86px]"
                                                value={range.open}
                                                onChange={(e) => handleTimeChange(day, index, 'open', e.target.value)}
                                            />
                                        </label>
                                        <label className="flex items-center justify-between w-full gap-1">
                                            Fechamento:
                                            <input
                                                type="time"
                                                className="border p-1 rounded w-[86px]"
                                                value={range.close}
                                                onChange={(e) => handleTimeChange(day, index, 'close', e.target.value)}
                                            />
                                        </label>

                                    </div>
                                    {schedule[day].timeRanges.length > 1 && (
                                        <div className="h-full flex  border-r-[1px] border-black ml-2 absolute right-2 rounded-2xl">
                                            <button
                                                type="button"
                                                className="text-red-500 translate-x-4 cursor-pointer"
                                                onClick={() => removeTimeRange(day, index)}
                                            >
                                                <IoMdCloseCircle className="" />

                                            </button>
                                        </div>

                                    )}
                                </div>

                            ))}
                            <button
                                type="button"
                                className="text-sm border-2 text-green-600 p-1 rounded-full mt-1 cursor-pointer px-3.5"
                                onClick={() => addHourOpenAndClosed(day)}
                            >
                                + Adicionar horário
                            </button>
                        </div>
                    )}
                </div>
            ))}

            <button className="primary-button" type="submit">Salvar</button>
        </form>
    );
};