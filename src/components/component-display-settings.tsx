import { ThemeButtonProps } from "../types/types-preferences-user.d";
import { IoMdMoon, IoIosSunny } from "react-icons/io";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

export const ToggleThemeAndFont = ({
  toggleTheme,
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  byStore
}: ThemeButtonProps) => {
  return (
    <div className={`${!byStore ? "-translate-y-2" : ""} w-auto h-auto text-lg sm:text-xl rounded-l-xl border border-zinc-400 border-r-0 bg-white dark:bg-zinc-950 absolute top-[10px] right-0 z-60 flex flex-row sm:flex-col items-center justify-center gap-2.5 px-2 py-1 sm:py-2 backdrop-blur-sm text-black dark:text-white`}>
      <button onClick={toggleTheme} className="hidden dark:inline cursor-pointer">
        <IoIosSunny className="w-6 h-6 m-0.5 text-primary z-[3]" />
      </button>
      <button onClick={toggleTheme} className="inline dark:hidden cursor-pointer">
        <IoMdMoon className="w-6 h-6 m-0.5 text-primary z-[3]" />
      </button>
      {byStore && (
        <div className="flex sm:flex-col gap-2.5">
          <button
            onClick={increaseFontSize}
            className={`${fontSize === "text-lg" ? "opacity-30" : "opacity-100 cursor-pointer"}`}
          >
            <BsZoomIn className="text-primary" />
          </button>
          <button
            onClick={decreaseFontSize}
            className={`${fontSize === "text-sm" ? "opacity-30" : "opacity-100 cursor-pointer"}`}
          >
            <BsZoomOut className="text-primary" />
          </button>
        </div>
      )}
    </div>
  );
};
