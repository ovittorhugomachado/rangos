import { useState, useEffect } from "react";
import { getStoreData } from "../../../services/store-data";
import { updateSchedules } from "../../../services/update-schedules";
import { OpeningHour } from "../../../types/schedules-types.d";
import { IoCloseOutline } from "react-icons/io5";
import { LoadingComponent } from "../../loading";
import { ErrorComponent } from "../../error";
import { AiFillCloseSquare } from "react-icons/ai";
import { checkOverlappingRanges, validateOpeningHours } from "../../../utils/validateOpeningHours";

interface UpdateSchedulesStore {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    message?: string;
}

export const UpdateSchedulesForm: React.FC<UpdateSchedulesStore> = ({
    onClose,
}) => {
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchStoreSchedules = async () => {
            setLoading(true);
            try {
                const response = await getStoreData();
                setOpeningHours(response.openingHours);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };
        fetchStoreSchedules();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setFieldErrors({});

        const schedule = openingHours.map(({ day, timeRanges }) => ({
            day,
            timeRanges,
        }));

        const fieldErrors: { [key: string]: string } = {};
        let hasError = false;
        schedule.forEach((range, idx) => {
            range.timeRanges.forEach((tr, trIdx) => {
                if (!tr.start || !tr.end) {
                    fieldErrors[`${idx}-${trIdx}-start`] = "Obrigatório";
                    fieldErrors[`${idx}-${trIdx}-end`] = "Obrigatório";
                    hasError = true;
                } else if (tr.start >= tr.end) {
                    fieldErrors[`${idx}-${trIdx}-start`] = "Início deve ser menor que fim";
                    fieldErrors[`${idx}-${trIdx}-end`] = "Fim deve ser maior que início";
                    hasError = true;
                }
            });
        });

        const validationError = validateOpeningHours(schedule) || checkOverlappingRanges(schedule);

        if (hasError || validationError) {
            setFieldErrors(fieldErrors);
            setError(validationError || "Corrija os campos destacados.");
            return;
        }

        setLoading(true);
        try {
            await updateSchedules({ schedule });
            setSuccessMessage("Horários atualizados com sucesso!");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Erro ao atualizar os horários da loja");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && !fieldErrors ? (
                <div className="fixed z-30 flex items-center justify-center w-screen h-screen bg-white/10 backdrop-blur-sm">
                    <div className="absolute z-50 flex flex-col items-center justify-center w-120 h-90 mx-3 p-5 pt-25 pb-20 bg-white border border-zinc-400 rounded-xl text-black">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <ErrorComponent message={error} />
                    </div>
                </div>
            ) : loading ? (
                <div className="fixed z-30 flex items-center justify-center w-screen h-screen bg-white/10 backdrop-blur-sm">
                    <div className="absolute z-50 flex flex-col items-center justify-center w-120 h-90 mx-3 p-5 pt-25 pb-20 bg-white border border-zinc-400 rounded-xl text-black">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <LoadingComponent />
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto max-h-screen">
                    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40"></div>
                    <form
                        id="update-schedules-form"
                        onSubmit={handleFormSubmit}
                        noValidate
                        className="relative z-50 flex flex-col items-center w-120 max-w-115 mx-3 mt-10 mb-10 px-5 pb-4 gap-4 bg-white border border-zinc-400 rounded-xl text-black max-h-[80vh] translate-y-[-3vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 left-0 w-full py-4 bg-white z-50 flex items-center justify-center">
                            <h2 className="text-xl text-center font-bold mx-10">Horários de Funcionamento</h2>
                            <button
                                type="button"
                                className="absolute right-0 m-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoCloseOutline className="text-lg" />
                            </button>
                        </div>

                        {successMessage && (
                            <p className="fon t-bold text-green-600">{successMessage}</p>
                        )}
                        {openingHours.map((oh, idx) => (
                            <div key={oh.day} className="flex flex-col justify-center items-center border-t-1 border-zinc-300 p-3 mb-2 w-full gap-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <span className="font-bold capitalize">{oh.day}</span>
                                        <label className="flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={oh.timeRanges.length > 0}
                                                onChange={e => {
                                                    const updated = [...openingHours];
                                                    if (e.target.checked) {
                                                        updated[idx].timeRanges.push({ start: '', end: '' });
                                                    } else {
                                                        updated[idx].timeRanges = [];
                                                    }
                                                    setOpeningHours(updated);
                                                }}
                                            />
                                            Aberto
                                        </label>
                                    </div>

                                </div>
                                <div className="flex flex-col gap-6">
                                    {oh.timeRanges.map((tr, trIdx) => (
                                        <div key={trIdx} className="relative flex flex-col items-center justify-center gap-2">
                                            <div className="w-[138px] relative flex items-center justify-end gap-2">
                                                <label htmlFor="">Abre</label>
                                                <input
                                                    type="time"
                                                    value={tr.start}
                                                    onChange={e => {
                                                        const updated = [...openingHours];
                                                        updated[idx].timeRanges[trIdx].start = e.target.value;
                                                        setOpeningHours(updated);
                                                    }}
                                                    className={`w-[92px] border px-2 py-1 rounded ${fieldErrors[`${idx}-${trIdx}-start`] ? "border-red-500" : ""}`}
                                                />
                                                {fieldErrors[`${idx}-${trIdx}-start`] && (
                                                    <span className="min-w-[92px] max-w-[200px] absolute top-[-20px] left-1/2 -translate-x-1/2 text-center text-xs text-red-600 whitespace-nowrap">{fieldErrors[`${idx}-${trIdx}-start`]}</span>
                                                )}
                                            </div>
                                            <div className="w-[138px] flex items-center justify-end gap-2">
                                                <label htmlFor="">Fecha</label>
                                                <input
                                                    type="time"
                                                    value={tr.end}
                                                    onChange={e => {
                                                        const updated = [...openingHours];
                                                        updated[idx].timeRanges[trIdx].end = e.target.value;
                                                        setOpeningHours(updated);
                                                    }}
                                                    className="w-[92px] border px-2 py-1 rounded"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = [...openingHours];
                                                    updated[idx].timeRanges.splice(trIdx, 1);
                                                    setOpeningHours(updated);
                                                }}
                                                className="h-full text-xl border-l-3 text-red-600 absolute right-[-28px] cursor-pointer"
                                            >
                                                <AiFillCloseSquare />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...openingHours];
                                            updated[idx].timeRanges.push({ start: "", end: "" });
                                            setOpeningHours(updated);
                                        }}
                                        className="text-blue-600 text-sm"
                                    >
                                        + Adicionar horário
                                    </button>
                                </div>
                            </div>
                        ))}
                    </form>

                    <div className="absolute left-1/2 -translate-x-1/2 w-full flex justify-center z-50" style={{ bottom: "6vh" }}>
                        <button
                            type="submit"
                            form="update-schedules-form"
                            className="w-[320px] max-w-[90vw] primary-button"
                        >
                            Salvar horários
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};