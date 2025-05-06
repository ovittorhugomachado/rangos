import { IoMdMoon, IoIosSunny } from "react-icons/io";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

interface ThemeButtonProps {
    toggleTheme: () => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    fontSize: 'text-sm' | 'text-lg';
}

const ToggleThemeAndFont = ({ toggleTheme, fontSize, increaseFontSize, decreaseFontSize }: ThemeButtonProps) => {

    return (
        <div className='primary-component absolute flex flex-row items-center justify-center gap-2.5 rounded-l-xl text-lg top-2 right-0 py-1 px-2 mx-3 sm:flex-col sm:text-xl sm:py-2 '>
            <button
                onClick={toggleTheme}
                className="hidden dark:inline cursor-pointer">
                <IoIosSunny className="w-6 h-6 m-0.2 z-[3]" />
            </button>
            <button
                onClick={toggleTheme}
                className="inline dark:hidden cursor-pointer">
                <IoMdMoon className="w-6 h-6 m-0.2 z-[3]" />
            </button>
            <button
                onClick={increaseFontSize}
                className={fontSize === "text-lg" ? "opacity-30" : "opacity-100 cursor-pointer"}>
                <BsZoomIn />
            </button>
            <button
                onClick={decreaseFontSize}
                className={fontSize === "text-sm" ? "opacity-30" : "opacity-100 cursor-pointer"}>
                <BsZoomOut />
            </button>
        </div>
    )
}

export { ToggleThemeAndFont }