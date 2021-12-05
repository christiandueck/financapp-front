import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "./useUser";
import { Color } from "./useColor";

export type Category = {
	id: number;
	name: string;
	type: 'income' | 'outcome';
	color: Color;
	active: boolean;
}

type CategoryContextData = {
	categories: Category[],
	activeCategories: Category[],
	getCategories: () => void;
	openCategoryModal: (category?: Category | null) => void;
	closeCategoryModal: () => void;
	isOpenCategoryModal: boolean;
	editCategory: Category;
	deactivateCategory: (categoryId?: number) => void;
}

export const CategoryContext = createContext({} as CategoryContextData)

type CategoryProvider = {
	children: ReactNode;
}

export function CategoryProvider(props: CategoryProvider) {
	const { user } = useUser();

	const [categories, setCategories] = useState<Category[] | null>(null)
	const [activeCategories, setActiveCategories] = useState<Category[] | null>(null)
	const [editCategory, setEditCategory] = useState<Category | null>(null)
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false)

	async function getCategories() {
		await api.get('category/get/all').then(response => {
			const sortedCategories = response.data.categories.sort((a, b) => (
				a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
			)
			setCategories(sortedCategories)
			setActiveCategories(sortedCategories.filter((item) => item.active === true))
		})
	}

	function openCategoryModal(category = null) {
		setEditCategory(category)
		setIsOpenCategoryModal(true)
	}

	function closeCategoryModal() {
		setEditCategory(null)
		getCategories()
		setIsOpenCategoryModal(false)
	}

	async function deactivateCategory(categoryId?: number) {
		const id = categoryId ? categoryId : editCategory.id
		await api.delete(`category/delete/${id}`)
		getCategories()
	}

	useEffect(() => {
		const token = localStorage.getItem('@financapp:token')

		if (token) {
			if (user) {
				api.defaults.headers.common.authorization = `Bearer ${token}`

				getCategories();
			}
		}
	}, [user])

	return (
		<CategoryContext.Provider value={{
			categories,
			activeCategories,
			getCategories,
			openCategoryModal,
			closeCategoryModal,
			isOpenCategoryModal,
			editCategory,
			deactivateCategory
		}}>
			{props.children}
		</CategoryContext.Provider>
	)
}

export const useCategory = () => useContext(CategoryContext);