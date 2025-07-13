import { Category } from "../../../../types/restaurante-data-types.d";

interface CategoryButtonsProps {
    categories: Category[];
    buttonColor?: string;
    textColor?: string;
}

export const CategoryButtons = ({ categories, buttonColor, textColor }: CategoryButtonsProps) => {
    return (
        <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5 lg:text-base">
            {categories.map((category) => (
                    <button
                        type="button"
                        style={{ backgroundColor: buttonColor ?? '#a6a6a6' }}
                        className={`text-${textColor ?? 'black'} relative flex-grow min-w-28 h-8 lg:h-10 px-3 rounded-3xl cursor-pointer transition-transform duration-200 hover:scale-101`}
                    >
                        {category.name}
                    </button>
            ))}
        </div>
    );
};