import { Category } from "../../../../types/restaurante-data-types.d";
import { IoCloseOutline } from "react-icons/io5";

interface CategoryButtonsProps {
    categories: Category[];
    buttonColor?: string;
    textColor?: string;
}

const CategoryButtons = ({ categories, buttonColor, textColor }: CategoryButtonsProps) => {
    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5">
            {categories.map((category) => (
                <div 
                key={category.id} 
                className={`relative flex-grow min-w-28 h-8 lg:h-10 px-3 rounded-3xl cursor-pointer transition-transform duration-200 text-${textColor}`}
                style={{ backgroundColor: buttonColor ?? '' }}
                >
                    <button
                        type="button"
                        className="flex items-center justify-center w-full h-full"
                        onClick={() => handleScroll(`category-${category.id}`)}
                    >
                        {category.name}
                    </button>
                    <button className="w-5 h-5 z-2 flex items-center justify-center bg-red-600 text-white rounded-full absolute top-[-21px] right-[5px] cursor-pointer hover:shadow-[0_0_8px_0px_rgba(255,0,0,0.7)] transition-all duration-200">
                        <IoCloseOutline className="text-lg" />
                    </button>
                </div>
            ))}
            <button className={`max-w-12 bg-transparent border-2 border-green-600 flex-grow h-8 lg:h-10 rounded-3xl cursor-pointer hover:scale-103 transition-transform duration-200 font-extrabold text-green-600`}>
                +
            </button>
        </div>
    );
};

export { CategoryButtons };