import { useCallback, useEffect, useState } from "react"
import { getMenuItemService } from "../../../services/service-manage-menu-store"
import { Item } from "./store-item";
import { ErrorComponent } from "../../component-error"
import { LoadingComponent } from "../../component-loading"
import { MenuItemCreationForm } from "../forms/form-create-update-menu-item";
import { IoMdAddCircle } from "react-icons/io";


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

export const MenuItems = ({
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
            console.error(error)
            setError('Erro ao buscar itens do menu');
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
                <div className="w-full flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : loading ? (
                <LoadingComponent />
            ) : (
                <section className="w-full">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`w-full mt-8 ${backgroundColor === 'white' ? 'text-black' : 'text-white'}`}
                        >
                            <h1
                                style={{ borderColor: buttonColor }}
                                className="text-2xl font-semibold border-b-4 pr-6 mb-2 inline-block"
                            >
                                {category.name}
                            </h1>
                            <ul className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 mx-auto">
                                {Array.isArray(menuItemsByCategory[category.id]) && menuItemsByCategory[category.id].length > 0 ? (
                                    menuItemsByCategory[category.id].map(item => (
                                        <li
                                            key={item.id}
                                            className={`relative flex border-[1px] ${backgroundColor === 'white' ? 'border-zinc-400' : 'border-zinc-900'}`}
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
                                    className="h-[150px] flex flex-col-reverse items-center justify-center border-[4px] border-primary cursor-pointer hover:scale-103 transition-transform duration-200"
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
    );
};


