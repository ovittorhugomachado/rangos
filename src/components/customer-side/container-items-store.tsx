import { useCallback, useEffect, useState } from "react"
import { getMenuItemService } from "../../services/menu-store"
import { ErrorComponent } from "../error-component"
import { LoadingComponent } from "../loading-component"
import { Item } from "./item-store";


interface MenuItemsContainerProps {
    categories: Category[];
    backgroundColor: string;
    buttonColor: string;
}

interface Category {
    id: number;
    name: string;
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    photoUrl?: string | null;
}

export const MenuItemsContainer = ({
    categories,
    backgroundColor,
    buttonColor,
}: MenuItemsContainerProps) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [menuItemsByCategory, setMenuItemsByCategory] = useState<{ [categoryId: number]: MenuItem[] }>({});

    const fetchMenuItems = useCallback(async () => {
        setLoading(true);
        try {
            const itemsObj: { [categoryId: number]: MenuItem[] } = {};
            for (const category of categories) {
                const response = await getMenuItemService(category.id);
                itemsObj[category.id] = response.data;
            }
            setMenuItemsByCategory(itemsObj);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro ao buscar itens do menu');
        } finally {
            setLoading(false);
        }
    }, [categories]);
    useEffect(() => {
        if (categories.length > 0) {
            fetchMenuItems();
        }
    }, [categories, fetchMenuItems]);

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : loading ? (
                <LoadingComponent />
            ) : (
                <section className="w-full xs:text-base">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'} mt-8`}
                            id={`category-${category.id}`}
                        >
                            <h1
                                style={{ borderColor: buttonColor }}
                                className={`inline-block pr-6 mb-2 text-2xl font-semibold border-b-4`}
                            >
                                {category.name}
                            </h1>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 mx-auto w-full max-w-6xl">
                                {Array.isArray(menuItemsByCategory[category.id]) && menuItemsByCategory[category.id].length > 0 ? (
                                    menuItemsByCategory[category.id].map(item => (
                                        <li
                                            key={item.id}
                                            className={`${backgroundColor === 'white' ? 'border-zinc-400' : 'border-zinc-900'} relative flex border-[1px] hover:scale-102 transition-all duration-300`}
                                        >
                                            <Item
                                                image={item.photoUrl ?? '../prato-default.png'}
                                                name={item.name}
                                                description={item.description}
                                                price={item.price}
                                                categoryId={category.id}
                                                id={item.id}
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex items-center">Nenhum item nesta categoria</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </section>
            )}
        </>
    )
};


