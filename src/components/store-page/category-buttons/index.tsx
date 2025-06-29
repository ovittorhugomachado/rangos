import { Category } from "../../../types/restaurante-data-types.d";

const CategoryButtons = ({ categories }: { categories: Category[] }) => {
    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5">
            {categories.map((category) => (
                <button
                    type="button"
                    className="bg-green-600 flex-grow min-w-28 h-8 lg:h-10 px-3 rounded-3xl"
                    key={category.id}
                    onClick={() => handleScroll(`category-${category.id}`)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export { CategoryButtons };