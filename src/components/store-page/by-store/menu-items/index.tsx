import { useEffect, useState } from "react"
import { getMenuItemService } from "../../../../services/menu-store"
import { ErrorComponent } from "../../../error"
import { LoadingComponent } from "../../../loading"
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

export const MenuItemsContainer = ({
    categories,
    backgroundColor,
    buttonColor,
}: MenuItemsContainerProps) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [menuItemsByCategory, setMenuItemsByCategory] = useState<{ [categoryId: number]: MenuItem[] }>({});
    const [showForm, setShowForm] = useState(false);

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
        ) : showForm ? (
            <div className="w-full flex justify-center items-center min-h-[300px]">
                <div className="bg-white text-black p-8 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Formulário de novo item</h2>
                    <button
                        className="mt-4 px-4 py-2 bg-primary text-white rounded"
                        onClick={() => setShowForm(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
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
                                    <li key={item.id} className={`flex border-[1px] border-zinc-${backgroundColor === 'white' ? '400' : '900'}`}>
                                        <img src={item.photoUrl ?? '../prato.webp'} alt="" className="w-[150px] h-[150px] object-cover" />
                                        <div className="flex flex-col justify-between py-4 px-4">
                                            <h1 className="font-bold">{item.name}</h1>
                                            <p className="font-light">{item.description}</p>
                                            <h3>R$ {item.price}</h3>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400">Nenhum item nesta categoria</li>
                            )}

                            <button
                                className={`h-[150px] flex flex-col-reverse items-center justify-center border-[4px] cursor-pointer border-primary hover:scale-105 transition-transform duration-200`}
                                onClick={() => setShowForm(true)}
                            >
                                Criar novo item na categoria {category.name}
                                <span>
                                    <IoMdAddCircle className="text-4xl text-primary" />
                                </span>
                            </button>
                        </ul>
                    </div>
                ))}
            </section>
        )}
    </>
    );
}


