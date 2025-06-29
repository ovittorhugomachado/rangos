import React, { useState } from 'react';
import { toggleHiddenFlex } from '../../../utils/toggleHiddenFlex';
import { MdOutlineColorLens } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

interface BottomNavProps {
    backgroundColorStore: string;
    setBackgroundColor: (color: string) => void;
    buttonColor: string;
    setButtonColor: (color: string) => void;
    textColorButtons: string;
    setTextColorButtons: (color: string) => void;
    className?: string;
    children?: React.ReactNode;
}

export const BottomNav = ({
    backgroundColorStore,
    setBackgroundColor,
    buttonColor,
    setButtonColor,
    textColorButtons,
    setTextColorButtons,
    className = '',
    children
}: BottomNavProps) => {
    const [toolbarOpen, setToolbarOpen] = useState(true);

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

    return (
        <nav className={`${backgroundColorStore === 'white' ? 'bg-black border-white text-white' : 'bg-white'} fixed w-[187px] top-0 right-0 m-3.5 py-2 rounded-2xl flex flex-col items-center content-between border-[0.1px] z-30 ${className}`}>
            <div
                className='flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out'
                onClick={handleToggleToolbar}
            >
                <MdOutlineColorLens className='text-3xl' />
                <span>Editar cores</span>
                <IoIosArrowDown className={toolbarOpen ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'} />
            </div>
            <div
                className={`flex flex-col mt-2.5 items-center content-between transition-all duration-500 ease-in-out ${toolbarOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
                id='toolbar'
            >
                <div className='h-full flex flex-col items-center justify-between '>
                    <span className='mb-2 font-bold'>Cor de fundo</span>
                    <div className='flex items-center gap-1 mx-2.5 font-extralight text-md'>
                        <span>Branco</span>
                        <button onClick={BackgroundStoreChange} className={`${backgroundColorStore === 'white' ? 'bg-zinc-800 hover:shadow-[0_0_16px_2px_rgba(155,155,155,0.7)]' : 'bg-zinc-400 hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.4)]'} w-[50px] h-[25px] items-center px-1 py-1 ml-1 flex gap-3 rounded-full cursor-pointer transition-all duration-300`} >
                            <span className={`${backgroundColorStore === 'white' ? 'bg-white' : 'translate-x-6 bg-black'} w-4.5 h-4.5 rounded-full transition-transform duration-300`}></span>
                        </button>
                        <span>Preto</span>
                    </div>
                </div>
                <div className='w-[130px] flex flex-col items-center border-y-2 border-primary mx-3.5 my-3 py-2.5 text-center'>
                    <label htmlFor='backgroundColor' className='mb-2 font-bold'>Cor dos botões</label>
                    <input
                        type="color"
                        name="buttonColor"
                        id="buttonColor"
                        className="cursor-pointer appearance-none border-1 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full w-[25px] h-[25px] px-0.5 rounded-full"
                        value={buttonColor}
                        onChange={handleButtonColorChange}
                    />
                </div>
                <span className='mb-2 font-bold text-center'>Cor do texto dos botões</span>
                <div className='flex items-center gap-1 mx-2.5 font-extralight text-md'>
                    <span>Branco</span>
                    <button onClick={toggleTextColorButtons} className={`${backgroundColorStore === 'white' ? 'bg-zinc-800 hover:shadow-[0_0_16px_2px_rgba(155,155,155,0.7)]' : 'bg-zinc-400 hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.4)]'} w-[50px] h-[25px] items-center px-1 py-1 ml-1 flex gap-3 rounded-full cursor-pointer transition-all duration-300`} >
                        <span
                            className={`${backgroundColorStore === 'white' ? 'bg-white' : ' bg-black'} 
                                ${textColorButtons === 'black' ? 'translate-x-6' : ''} 
                                w-4.5 h-4.5 rounded-full transition-transform duration-300`}
                        />
                    </button>
                    <span>Preto</span>
                </div>
                <button className='w-full bg-primary text-black rounded-3xl absolute bottom-[-30px] cursor-pointer hover:scale-[104%] transition'>Salvar mudanças</button>
                {children}
            </div>
        </nav>
    );
};