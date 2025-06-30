import React, { useState } from "react";
import { createCategoryService, deleteCategoryService } from "../../../../../services/menu-store";
import { Category } from "../../../../../types/restaurante-data-types.d";
import { CreateCategoryForm } from "../form-create-category";
import { IoCloseOutline } from "react-icons/io5";

interface CategoryButtonsProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    buttonColor?: string;
    textColor?: string;
}

export const CategoryButtons = ({ categories, setCategories, buttonColor, textColor }: CategoryButtonsProps) => {
    const [showForm, setShowForm] = useState(false);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const createCategory = async (name: string) => {
        try {
            const createdCategory = await createCategoryService({ name });
            if (createdCategory !== null && createdCategory !== undefined) {
                setCategories(prev => [...prev, createdCategory]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (categoryId: number) => {
        try {
            await deleteCategoryService(categoryId);
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        } catch (error) {
            console.error(error);
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
                    <button
                        className="w-5 h-5 z-2 flex items-center justify-center bg-red-600 text-white rounded-full absolute top-[-11px] left-[0] border-[1px] border-amber-50 cursor-pointer hover:shadow-[0_0_8px_0px_rgba(255,0,0,0.7)] transition-all duration-200"
                        onClick={() => deleteCategory(category.id)}
                    >
                        <IoCloseOutline className="text-lg" />
                    </button>
                </div>
            ))}
            {showForm ? (
                <CreateCategoryForm
                    onClose={() => setShowForm(false)}
                    onSubmit={async (name) => {
                        await createCategory(name);
                        setShowForm(false);
                    }}
                />
            ) : (
                <button
                    className="w-[35px] max-w-[35px] bg-transparent border-2 border-green-600 flex-grow h-8 lg:h-10 rounded-3xl cursor-pointer hover:scale-103 transition-transform duration-200 font-extrabold text-green-600"
                    onClick={() => setShowForm(true)}
                >
                    +
                </button>
            )}
        </div>
    );
};