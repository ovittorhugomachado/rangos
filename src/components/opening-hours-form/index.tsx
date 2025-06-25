import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useEffect } from "react";
import { DayOfWeek } from "../../types/restaurante-data-types.d";

export const OpeningHoursForm = () => {
    const { user } = useAuth();

    const [openingHours, setOpeningHours] = useState(
        user?.openingHours || []
    );

    console.log(openingHours)

    useEffect(() => {
        setOpeningHours(user?.openingHours || []);
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Horários salvos:", openingHours);
    };

    const handleStatusChange = (day: string, status: "open" | "closed") => {
        setOpeningHours((prev) =>
            prev.map((item) =>
                item.day.toLowerCase() === day.toLowerCase()
                    ? {
                        ...item,
                        status,
                        timeRanges:
                            status === "open" && item.timeRanges.length === 0
                                ? [{ open: "08:00", close: "18:00" }]
                                : item.timeRanges,
                    }
                    : item
            )
        );
    };
    console.log(openingHours)
    const handleTimeChange = (
        day: string,
        index: number,
        field: "open" | "close",
        value: string
    ) => {
        setOpeningHours((prev) =>
            prev.map((item) => {
                if (item.day.toLowerCase() === day.toLowerCase()) {
                    const newTimeRanges = [...item.timeRanges];
                    newTimeRanges[index] = {
                        ...newTimeRanges[index],
                        [field]: value,
                    };
                    return { ...item, timeRanges: newTimeRanges };
                }
                return item;
            })
        );
    };

    const addHourOpenAndClosed = (day: DayOfWeek) => {
        setOpeningHours(prev =>
            prev.map(item =>
                item.day.toLowerCase() === day.toLowerCase()
                    ? {
                        ...item,
                        timeRanges: [
                            ...(item.timeRanges || []),
                            { open: '08:00', close: '18:00' }
                        ]
                    }
                    : item
            )
        );
    };
    return (
        <form
            className="bg-white text-black w-[90%] max-w-[500px] flex flex-col items-center gap-3.5 primary-component py-8"
            id="hoursForm"
            onSubmit={handleSubmit}
        >
            <h1 className="text-lg text-center mx-1.5 border-b-2 border-primary">
                Horários de funcionamento
            </h1>
            {openingHours.map((data) => (
                <div
                    key={data.day}
                    className="w-[90%] border-b-[1px] border-gray-400 p-3 mx-3 flex flex-col items-center gap-2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="font-bold">{data.day}</h3>
                        <div className="flex gap-3">
                            <label className="flex items-center gap-0.5">
                                <input
                                    type="radio"
                                    name={`${data.day}_status`}
                                    checked={data.status === "closed"}
                                    onChange={() => handleStatusChange(data.day, "closed")}
                                />
                                Fechado
                            </label>
                            <label className="flex items-center gap-0.5">
                                <input
                                    type="radio"
                                    name={`${data.day}_status`}
                                    checked={data.status === "open"}
                                    onChange={() => handleStatusChange(data.day, "open")}
                                />
                                Aberto
                            </label>
                        </div>
                    </div>
                    {data.status === 'open' && (
                        <div>
                            {data.timeRanges.map((range, index) => (
                                <div key={index} className="flex relative pr-4 gap-4">

                                    <div className="flex flex-col w-[190px] gap-2 items-center justify-center">
                                        <label className="flex items-center justify-between w-full gap-1">
                                            Abre:
                                            <input
                                                type="time"
                                                className="border p-1 rounded w-[95px]"
                                                value={range.open}
                                                onChange={(e) =>
                                                    handleTimeChange(
                                                        data.day,
                                                        index,
                                                        "open",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                        <label className="flex items-center justify-between w-full gap-1">
                                            Fecha:
                                            <input
                                                type="time"
                                                className="border p-1 rounded w-[95px]"
                                                value={range.close}
                                                onChange={(e) =>
                                                    handleTimeChange(
                                                        data.day,
                                                        index,
                                                        "close",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="text-sm border-2 text-green-600 p-1 rounded-full mt-1 cursor-pointer px-3.5"
                                onClick={() => addHourOpenAndClosed(data.day)}
                            >
                                + Adicionar horário
                            </button>
                        </div>
                    )}
                </div>
            ))}
            {/*{schedule[day].status === 'open' && (
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
                                        <div className="h-full flex items-center border-r-[1px] border-black ml-2 absolute right-2 rounded-2xl">
                                            <button
                                                type="button"
                                                className="h-4 text-red-500 translate-x-4 cursor-pointer"
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
            ))} */}

            <button className="primary-button" type="submit">
                Salvar
            </button>
        </form>
    );
};