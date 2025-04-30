import { IoMdMoon, IoIosSunny } from "react-icons/io";

const ThemeButton = () => {
    return (
        <div className="fixed top-2 right-5 flex gap-1 bg-gray-300 rounded-3xl border-5 border-gray-300 cursor-pointer">
            <span className="absolute w-6 h-6 bg-green-400 rounded-[20px] border border-green-400 outline-3 outline-green-400"></span>
            <IoIosSunny className="w-6 h-6 m-0.2 z-[3]" />
            <IoMdMoon className="w-6 h-6 m-0.2 z-[3]" />
        </div>
    )
}

export { ThemeButton }