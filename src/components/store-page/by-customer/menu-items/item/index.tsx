interface ItemProps {
    image?: string;
    name: string;
    description: string;
    price: number | string;
    categoryId: number;
    id: number;
}

export const Item = ({
    image,
    name,
    description,
    price,
}: ItemProps) => {

    return (
        <button className="w-full flex hover:scale-102 transition-all duration-300 cursor-pointer">
            <div className="w-[150px] h-[150px] relative">
                <img src={image}
                    alt={name}
                    className="w-[150px] h-[150px] object-cover" />
            </div>
            <div className="flex flex-col justify-between items-start py-4 px-4">
                <h1 className="font-bold text-start">{name}</h1>
                <p className="font-light text-start">{description}</p>
                <h3>R$ {Number(price.toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h3>
            </div>
        </button>
    )
}