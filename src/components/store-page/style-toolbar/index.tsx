import React from 'react';
import { MdOutlineColorLens } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


interface BottomNavProps {
    theme: string;
    onThemeChange: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const BottomNav = ({
    onThemeChange,
    className = '',
    children
}: BottomNavProps) => {
    return (
        <nav className={`bg-zinc-950 fixed top-0 right-0 m-3.5 py-2 rounded-2xl flex flex-col items-center content-between border-[0.1px] border-white text-white ${className}`}>
            <div className='flex'>
                <MdOutlineColorLens className='text-3xl' />
                <span>Editar cores</span>
                <IoIosArrowDown />
            </div>

            <div className='flex flex-col items-center content-between'>
                <div className='h-full flex flex-col items-center justify-between '>
                    <span className='mb-2'>Cor de fundo</span>
                    <div className='flex items-center gap-1 mx-2.5 font-extralight text-md'>
                        <span>Branco</span>
                        <button onClick={onThemeChange} className="w-[50px] h-[25px] bg-zinc-900 flex items-center px-1 py-1 ml-1 flex gap-3 rounded-full cursor-pointer hover:bg-zinc-800" >
                            <span className='w-4.5 h-4.5 rounded-full bg-red-600'></span>
                        </button>
                        <span>Preto</span>
                    </div>
                </div>
                <span className='h-[1px] w-26 rounded-full bg-white my-4' />
                <div className='w-26 flex flex-col items-center mx-3.5'>
                    <span className='mb-2'>Cor principal</span>
                    <input type="color" name="" id="" className='cursor-pointer appearance-none border-1 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full w-[25px] h-[25px] px-0.5 rounded-full' />
                </div>
                <button className='w-full bg-green-600 rounded-3xl absolute bottom-[-30px] cursor-pointer hover:scale-[104%] transition'>Salvar mudanças</button>
                {children}
            </div>

        </nav>
    );
};