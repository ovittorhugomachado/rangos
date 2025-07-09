import { useCallback, useEffect, useState } from "react"
import { getMenuItemService } from "../../../../services/menu-store"
import { ErrorComponent } from "../../../error"
import { LoadingComponent } from "../../../loading"
import { IoMdAddCircle } from "react-icons/io";
import { MenuItemCreationForm, UpdateMenuItemForm } from "../../../forms/create-update-menu-item";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { deleteMenuItemService } from "../../../../services/menu-store";


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
    const [showFormUpdateMenuItem, setShowFormUpdateMenuItem] = useState<number | null>(null);

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
                                            <img src={item.photoUrl ?? '../prato.png'} alt="" className="w-[150px] h-[150px] object-cover" />
                                            <div className="flex flex-col justify-between py-4 px-4">
                                                <h1 className="font-bold">{item.name}</h1>
                                                <p className="font-light">{item.description}</p>
                                                <h3>R$ {Number(item.price.toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h3>
                                            </div>
                                            {showFormUpdateMenuItem === item.id && (
                                                <UpdateMenuItemForm
                                                    onClose={() => setShowFormUpdateMenuItem(null)}
                                                    categoryId={category.id}
                                                    onUpdated={fetchMenuItems}
                                                    itemId={item.id}
                                                    initialData={item}
                                                />
                                            )}
                                            <div className="flex top-[-11px] right-[10px] absolute">
                                                <button
                                                    title="Renomear categoria"
                                                    className="rounded-full w-5 h-5 z-2 flex items-center justify-center bg-blue-800 text-white border-[1px] border-amber-50 cursor-pointer hover:scale-105 transition-all duration-200"
                                                    onClick={() => setShowFormUpdateMenuItem(item.id)}
                                                >
                                                    <MdOutlineEdit className="text-sm" />
                                                </button>
                                                <button
                                                    title="Excluir categoria"
                                                    className="w-5 h-5 ml-2 z-2 flex items-center justify-center bg-red-600 text-white rounded-full border-[1px] border-amber-50 cursor-pointer hover:scale-105 transition-all duration-200"
                                                    onClick={async () => {
                                                        await deleteMenuItemService(item.id);
                                                        fetchMenuItems();
                                                    }}
                                                >
                                                    <IoCloseOutline className="text-lg" />
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400 flex items-center">Nenhum item nesta categoria</li>
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
    );
}


