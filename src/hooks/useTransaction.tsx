import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "./useUser";
import { Category, useCategory } from "./useCategory";
import { Account, useAccount } from "./useAccount";
import { useColor } from "./useColor";

export type Transaction = {
	id: number;
	description: string;
	type: 'income' | 'outcome' | 'transfer';
	amount: number;
	date: Date;
	installments: number;
	category: Category;
	account: Account;
}

export const TransactionTypes = [
	{ type: 'income', label: 'Entrada' },
	{ type: 'outcome', label: 'Saída' },
	{ type: 'transfer', label: 'Transferência' }
]

type TransactionContextData = {
	transactions: Transaction[],
	getTransactions: () => void;
	openTransactionModal: (Transaction?: Transaction | null) => void;
	closeTransactionModal: () => void;
	isOpenTransactionModal: boolean;
	editTransaction: Transaction;
	deleteTransaction: (TransactionId?: number) => void;
}

export const TransactionContext = createContext({} as TransactionContextData)

type TransactionProvider = {
	children: ReactNode;
}

export function TransactionProvider(props: TransactionProvider) {
	const { user } = useUser();
	const { colors } = useColor();
	const { accounts } = useAccount();
	const { categories } = useCategory();

	const [transactions, setTransactions] = useState<Transaction[] | null>(null)
	const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)
	const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false)

	async function getTransactions() {
		await api.get(`transaction/get/2021-12`).then(response => {
			/*const sortedTransactions = response.data.Transactions.sort((a, b) => (
				a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)
			)*/
			const mappedTransactions = response.data.transactions.map(transaction => {
				return {
					...transaction,
					category: categories[categories.map(e => e.id).indexOf(transaction?.category?.id)],
					account: accounts[accounts.map(e => e.id).indexOf(transaction?.account?.id)],
				}
			})
			setTransactions(mappedTransactions)
		})
	}

	function openTransactionModal(Transaction = null) {
		setEditTransaction(Transaction)
		setIsOpenTransactionModal(true)
	}

	function closeTransactionModal() {
		setEditTransaction(null)
		getTransactions()
		setIsOpenTransactionModal(false)
	}

	async function deleteTransaction(transactionId?: number) {
		const id = transactionId ? transactionId : editTransaction.id
		await api.delete(`Transaction/delete/${id}`)
		getTransactions()
	}

	useEffect(() => {
		const token = localStorage.getItem('@financapp:token')

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`

			getTransactions();
		}
	}, [user])

	return (
		<TransactionContext.Provider value={{
			transactions,
			getTransactions,
			openTransactionModal,
			closeTransactionModal,
			isOpenTransactionModal,
			editTransaction,
			deleteTransaction
		}}>
			{props.children}
		</TransactionContext.Provider>
	)
}

export const useTransaction = () => useContext(TransactionContext);