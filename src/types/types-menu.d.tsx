export type Category = {
  id: number; 
  name: string;
};

export type CategoryButtonsProps = {
    categories: Category[];
    setCategories?: React.Dispatch<React.SetStateAction<Category[]>>;
    buttonColor?: string;
    textColor?: string;
}

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  categoryId: number;
};

export type MenuItemsContainerProps = {
    categories: Category[];
    backgroundColor: string;
    buttonColor: string;
}

