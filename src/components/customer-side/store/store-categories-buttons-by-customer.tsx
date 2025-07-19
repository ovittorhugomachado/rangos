import { CategoryButtonsProps } from "../../../types/types-menu.d";

export const CategoryButtons = ({ categories, buttonColor, textColor }: CategoryButtonsProps) => {

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const y = section.getBoundingClientRect().top + window.scrollY;
            const offset = 140;
            window.scrollTo({ top: y - offset, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5 lg:text-base">
            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    style={{ backgroundColor: buttonColor ?? '#a6a6a6', color: textColor ?? '#000' }}
                    className={` relative flex-grow min-w-28 h-8 lg:h-10 px-3 rounded-3xl cursor-pointer transition-transform duration-200 hover:scale-101`}
                    onClick={() => handleScroll(`category-${category.id}`)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};