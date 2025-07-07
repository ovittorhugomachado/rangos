import { useEffect, useState } from "react";
import { getCategoriesStore, getMenuItemService } from "../services/menu-store";
import { MenuItemsContainer } from "../components/store-page/by-store/menu-items";
import { MenuItemCreationForm } from "../components/forms/create-update-menu-item";

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

export const PlaygroundPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [menuItemsByCategory, setMenuItemsByCategory] = useState<{ [categoryId: number]: MenuItem[] }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const categoriesResponse = await getCategoriesStore();
                setCategories(categoriesResponse);

                // Busca os itens de cada categoria
                const itemsObj: { [categoryId: number]: MenuItem[] } = {};
                for (const category of categoriesResponse) {
                    const response = await getMenuItemService(category.id);
                    itemsObj[category.id] = response.data;
                }
                setMenuItemsByCategory(itemsObj);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);


    return (
        <section className="">
            <h1>Playground</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <MenuItemCreationForm onClose={() => {}} /> 
            )}
        </section>
    );
};
