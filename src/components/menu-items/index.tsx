import { useEffect, useState } from "react"
import { getMenuItemService } from "../../services/menu-store"
import { ErrorComponent } from "../error"
import { LoadingComponent } from "../loading"

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

    useEffect(() => {
        const fetchMenuItems = async () => {
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
        };
        if (categories.length > 0) {
            fetchMenuItems();
        }
    }, [categories]);

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
                        <div key={category.id} className="mt-8">
                            <h1
                                style={{borderColor: buttonColor}}    
                                className="inline-block pr-6 mb-2 text-2xl font-semibold border-b-4 "
                            >
                                {category.name}
                            </h1>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 mx-auto w-full max-w-6xl">
                                {Array.isArray(menuItemsByCategory[category.id]) && menuItemsByCategory[category.id].length > 0 ? (
                                    menuItemsByCategory[category.id].map(item => (
                                        <li key={item.id} className={`flex border-[1px] border-zinc-${backgroundColor === 'white' ? '400' : '700'}`}>
                                            <img src={item.photoUrl ?? '../prato.webp'} alt="" className="w-[150px] h-[150px] object-cover" />
                                            <div className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'}  flex flex-col justify-between py-2 px-4`}>
                                                <h1 className="font-bold">{item.name}</h1>
                                                <h3>{item.description}</h3>
                                                <h3>R$ {item.price}</h3>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400">Nenhum item nesta categoria</li>
                                )}
                            </ul>
                        </div>
                    ))}

                </section>
            )}
        </>
    );
}


