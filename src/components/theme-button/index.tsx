import { IoMdMoon, IoIosSunny } from "react-icons/io";

const ThemeButton = () => {
    return (
        <div className="fixed top-2 right-5 flex gap-1 bg-amber-50 rounded-3xl border-5 border-amber-50 cursor-pointer">
            <span className="absolute w-6 h-6 bg-green-domus rounded-[20px] border border-green-domus outline-3 outline-green-domus"></span>
            <IoIosSunny className="w-6 h-6 m-0.2 z-[3]" />
            <IoMdMoon className="w-6 h-6 m-0.2 z-[3]" />
        </div>
    )
}

export { ThemeButton }