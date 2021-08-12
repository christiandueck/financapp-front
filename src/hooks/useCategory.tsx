import { useDisclosure } from '@chakra-ui/react';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';

export type Category = {
  id?: number;
  user?: string;
  name: string;
  color: string;
  type: 'income' | 'outcome';
  active?: boolean;
}

type CategoryContextData = {
  categoriesList: Category[];
  activeCategoriesList: Category[];
  listCategories: () => Promise<void>;
  addCategory: (category: Category) => void;
  deactivateCategory: (categoryId: number) => void;
  updateCategory: (category: Category) => void;
  isLoading: boolean;
  editCategory: Category;
  isOpen: boolean;
  onClose: () => void;
  openAddCategoryModal: () => void;
  openEditCategoryModal: (category: Category) => void;
  reactivateCategory: () => void;
}

export const CategoryContext = createContext({} as CategoryContextData);

type CategoryContextProviderProps = {
  children: ReactNode;
}

export async function getCategories() {
  const { data } = await api.get('category/all')

  const categories: Category[] = data.map(category => {
    return {
      id: category.id,
      name: category.name,
      type: category.type,
      color: category.color,
      active: category.active === 1 ? true : false
    }
  })

  return categories;
}

export function CategoryContextProvider({ children }: CategoryContextProviderProps) {
  const [categoriesList, setCategoriesList] = useState<Category[]>();
  const [activeCategoriesList, setActiveCategoriesList] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<Category>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  function openAddCategoryModal() {
    setEditCategory(null);
    onOpen()
  }

  function openEditCategoryModal(category: Category) {
    setEditCategory(category);
    onOpen();
  }

  async function listCategories() {
    Promise.resolve(getCategories()).then((categories) => {
      setCategoriesList(categories)
    })
  }

  async function addCategory(category: Category) {
    await api.post('category/insert', category)
    listCategories()
    onClose()
  }

  async function deactivateCategory(categoryId: number | string) {
    await api.delete('category/', {
      data: {
        "id": categoryId
      }
    })
    listCategories()
    onClose()
  }

  async function updateCategory(category: Category) {
    await api.patch('category/', category)
    listCategories()
    setEditCategory(null)
    onClose()
  }

  async function reactivateCategory() {
    const category = editCategory
    category.active = true;
    updateCategory(category);
    setEditCategory(null)
  }

  return (
    <CategoryContext.Provider value={{
      categoriesList,
      activeCategoriesList,
      listCategories,
      addCategory,
      deactivateCategory,
      updateCategory,
      isLoading,
      editCategory,
      isOpen,
      onClose,
      openAddCategoryModal,
      openEditCategoryModal,
      reactivateCategory
    }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  return useContext(CategoryContext);
}