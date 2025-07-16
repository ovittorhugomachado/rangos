import { useCallback, useEffect, useState } from "react"
import { getMenuItemService } from "../../../services/service-manage-menu-store"
import { ErrorComponent } from "../../error-component"
import { LoadingComponent } from "../../loading-component"
import { IoMdAddCircle } from "react-icons/io";
import { MenuItemCreationForm } from "../forms/create-update-menu-item-form";
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
    const [showFormCreateMenuItem, setShowFormCreateMenuItem] = useState<number | null>(null);

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
                <section className="w-full">
                    {categories.map(category => (
                        <div key={category.id} className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'} mt-8`}>
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
                                            className={`${backgroundColor === 'white' ? 'border-zinc-400' : 'border-zinc-900'} relative flex border-[1px]`}
                                        >
                                            <Item
                                                image={item.photoUrl ?? '../prato-default.png'}
                                                name={item.name}
                                                description={item.description}
                                                price={item.price}
                                                categoryId={category.id}
                                                id={item.id}
                                                onUpdated={fetchMenuItems}
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex items-center">Nenhum item nesta categoria</li>
                                )}

                                <button
                                    className={`h-[150px] flex flex-col-reverse items-center justify-center border-[4px] cursor-pointer border-primary hover:scale-103 transition-transform duration-200`}
                                    onClick={() => setShowFormCreateMenuItem(category.id)}
                                >
                                    Criar novo item na categoria {category.name}
                                    <span>
                                        <IoMdAddCircle className="text-4xl text-primary" />
                                    </span>
                                </button>
                            </ul>
                            {showFormCreateMenuItem === category.id && (
                                <MenuItemCreationForm
                                    onClose={() => setShowFormCreateMenuItem(null)}
                                    categoryId={category.id}
                                    onCreated={fetchMenuItems}
                                />
                            )}
                        </div>
                    ))}
                </section>
            )}
        </>
    )
};


