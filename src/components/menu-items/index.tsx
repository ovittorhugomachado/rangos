import { useEffect, useState } from "react"
import { getMenuItemService } from "../../services/menu-store"
import { ErrorComponent } from "../error"
import { LoadingComponent } from "../loading"

interface Category {
    id: number;
    name: string;
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

export const MenuItemsContainer = ({ categories }: { categories: Category[] }) => {

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
                    itemsObj[category.id] = response.data; // supondo que response.data é um array de MenuItem
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
                <div className="menu-items">
                    {categories.map(category => (
                        <div key={category.id}>
                            <h1 className="text-2xl font-semibold">{category.name}</h1>
                            <ul>
                                {Array.isArray(menuItemsByCategory[category.id]) && menuItemsByCategory[category.id].length > 0 ? (
                                    menuItemsByCategory[category.id].map(item => (
                                        <li key={item.id}>
                                            <strong>{item.name}</strong> - {item.description} - R$ {item.price}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400">Nenhum item nesta categoria</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}


