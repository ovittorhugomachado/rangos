import React, { useEffect, useState } from 'react';
import { updatePageStyle } from '../../../services/service-page-style';
import { toggleHiddenFlex } from '../../../utils/function-toggleHiddenFlex';
import { useDraggable } from '../../../hooks/use-draggable';
import { BottomNavProps } from '../../../types/types-style-store-page.d';
import { MdOutlineColorLens } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

export const BottomNav = ({
    initialBackgroundColor,
    initialButtonColor,
    initialTextColorButtons,
    backgroundColorStore,
    setBackgroundColor,
    buttonColor,
    setButtonColor,
    textColorButtons,
    setTextColorButtons
}: BottomNavProps) => {

    const [toolbarOpen, setToolbarOpen] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const {
        ref: navRef,
        position,
        dragging,
        handleMouseDown,
        handleTouchStart,
    } = useDraggable();

    const handleToggleToolbar = () => {
        const toolbar = document.getElementById('toolbar');
        if (toolbar) toggleHiddenFlex(toolbar);
        setToolbarOpen(prev => !prev);
    };

    const BackgroundStoreChange = () => {
        setBackgroundColor(backgroundColorStore === 'white' ? 'black' : 'white');
    };

    const toggleTextColorButtons = () => {
        setTextColorButtons(textColorButtons === "white" ? "black" : "white");
    };

    const handleButtonColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setButtonColor(event.target.value);
    };

    useEffect(() => {
        setHasChanges(
            buttonColor !== initialButtonColor ||
            backgroundColorStore !== initialBackgroundColor ||
            textColorButtons !== initialTextColorButtons
        );
    }, [buttonColor, initialButtonColor, backgroundColorStore, initialBackgroundColor, textColorButtons, initialTextColorButtons]);

    console.log(textColorButtons)
    const saveChanges = async () => {
        try {
            await updatePageStyle({
                primaryColor: buttonColor,
                backgroundColor: backgroundColorStore,
                textButtonColor: textColorButtons,
            });

            setHasChanges(false);

        } catch (error) {
            alert("Erro ao salvar as mudanças!");
            console.error(error)
        }
    };

    return (
        <nav
            ref={navRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
                position: 'fixed',
                top: position.y || 0,
                left: position.x || 'auto',
                right: position.x === 0 ? 0 : 'auto',
                cursor: dragging ? 'grabbing' : 'grab',
                zIndex: 30,
            }}
            className={`w-[187px] py-2 mx-2.5 my-1.5 ${backgroundColorStore === 'white' ? 'bg-black border-white text-white' : 'bg-white'} fixed z-30 flex flex-col items-center content-between rounded-2xl border-[0.1px] select-none`}
        >
            <span className="text-3xl text-zinc-600 left-[-20px] top-1 my-auto absolute">⋮⋮</span>
            <button className="gap-1 flex items-center cursor-pointer transition-all duration-300 ease-in-out" onClick={handleToggleToolbar}>
                <MdOutlineColorLens className="text-3xl" />
                <span>Editar cores</span>
                <IoIosArrowDown className={toolbarOpen ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'} />
            </button>
            <div
                id="toolbar"
                className={`flex flex-col items-center content-between relative transition-all duration-500 ease-in-out ${toolbarOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
            >
                <div className="flex flex-col items-center justify-between h-full">
                    <span className="mb-2 font-bold">Cor de fundo</span>
                    <div className="gap-1 mx-2.5 text-md font-extralight flex items-center">
                        <span>Branco</span>
                        <button
                            onClick={BackgroundStoreChange}
                            className={`w-[50px] h-[25px] ml-1 px-1 py-1 ${backgroundColorStore === 'white' ? 'bg-zinc-800 hover:shadow-[0_0_16px_2px_rgba(155,155,155,0.7)]' : 'bg-zinc-400 hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.4)]'} flex items-center gap-3 rounded-full cursor-pointer transition-all duration-300`}
                        >
                            <span className={`w-4.5 h-4.5 ${backgroundColorStore === 'white' ? 'bg-white' : 'translate-x-6 bg-black'} rounded-full transition-transform duration-300`}></span>
                        </button>
                        <span>Preto</span>
                    </div>
                </div>
                <div className="w-[130px] mx-3.5 my-3 py-2.5 border-y-2 border-primary flex flex-col items-center text-center">
                    <label htmlFor="buttonColor" className="mb-2 font-bold">Cor dos botões</label>
                    <input
                        type="color"
                        name="buttonColor"
                        id="buttonColor"
                        className="w-[25px] h-[25px] px-0.5 rounded-full border-1 appearance-none cursor-pointer [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full"
                        value={buttonColor}
                        onChange={handleButtonColorChange}
                    />
                </div>
                <span className="mb-2 font-bold text-center">Cor do texto dos botões</span>
                <div className="gap-1 mx-2.5 text-md font-extralight flex items-center">
                    <span>Branco</span>
                    <button
                        onClick={toggleTextColorButtons}
                        className={`w-[50px] h-[25px] ml-1 px-1 py-1 ${backgroundColorStore === 'white' ? 'bg-zinc-800 hover:shadow-[0_0_16px_2px_rgba(155,155,155,0.7)]' : 'bg-zinc-400 hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.4)]'} flex items-center gap-3 rounded-full cursor-pointer transition-all duration-300`}
                    >
                        <span className={`w-4.5 h-4.5 ${backgroundColorStore === 'white' ? 'bg-white' : 'bg-black'} ${textColorButtons === 'black' ? 'translate-x-6' : ''} rounded-full transition-transform duration-300`} />
                    </button>
                    <span>Preto</span>
                </div>
            </div>
            {hasChanges && (
                <button
                    className="w-full absolute bottom-[-30px] opacity-100 bg-primary text-black rounded-3xl mt-3 cursor-pointer hover:scale-[104%] transition"
                    onClick={saveChanges}
                >
                    Salvar mudanças
                </button>
            )}
        </nav>
    );
};