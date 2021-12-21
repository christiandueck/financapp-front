import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "./useUser";
import { Category, useCategory } from "./useCategory";
import { Account, useAccount } from "./useAccount";

type Period = {
	year: number;
	month: number;
}

type DashboardData = {
	month: number;
	year: number;
	month_expenses: {
		name: string;
		amount: number;
		color: string;
	}[],
	monthly_balance: {
		xaxis: string[];
		series: {
			name: string;
			data: number[];
			color: string;
		}[]
	}
}

export type Transaction = {
	id: number;
	payment_id: number;
	description: string;
	type: 'income' | 'outcome' | 'transfer';
	amount: number;
	date: Date;
	installments: number;
	installment?: string;
	category: Category;
	account: Account;
	destiny_account: Account | null;
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
	summary: { income: number, outcome: number }
	period: Period;
	setPeriod: (period: Period) => void;
	dashboard: DashboardData;
	getDashboard: () => void;
}

export const TransactionContext = createContext({} as TransactionContextData)

type TransactionProvider = {
	children: ReactNode;
}

export function TransactionProvider(props: TransactionProvider) {
	const { user } = useUser();
	const { accounts } = useAccount();
	const { categories } = useCategory();

	const [transactions, setTransactions] = useState<Transaction[]>([])
	const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)
	const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false)
	const [summary, setSummary] = useState({ income: 0, outcome: 0 })
	const [period, setPeriod] = useState<Period>({ year: new Date().getFullYear(), month: (new Date().getMonth() + 1) })
	const [dashboard, setDashboard] = useState<DashboardData>(null)

	function convertedPeriod(period: Period) {
		return `${period.year}-${String(period.month).padStart(2, '0')}`
	}

	async function getTransactions() {
		await api.get(`transaction/get/${convertedPeriod(period)}`).then(response => {
			/*const sortedTransactions = response.data.Transactions.sort((a, b) => (
				a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)
			)*/
			console.log(response.data)
			const mappedTransactions = response.data.transactions.map(transaction => {
				return {
					...transaction,
					category: categories[categories.map(e => e.id).indexOf(transaction?.category?.id)],
					account: accounts[accounts.map(e => e.id).indexOf(transaction?.account?.id)],
					destiny_account: accounts[accounts.map(e => e.id).indexOf(transaction?.destiny_account?.id)] || null,
				}
			})
			setTransactions(mappedTransactions)
			const income = mappedTransactions.filter(item => item.type === 'income').reduce((acc, item) => (
				acc + item.amount
			), 0)
			const outcome = mappedTransactions.filter(item => item.type === 'outcome').reduce((acc, item) => (
				acc + item.amount
			), 0)

			setSummary({ income, outcome })
		}).catch(error => {
			setTransactions(null)
			setSummary({ income: 0, outcome: 0 })
		})
	}

	async function getDashboard() {
		await api.get(`dashboard/${convertedPeriod(period)}`).then(response => {
			const monthlyBalance = {
				xaxis: response.data.dashboard.monthly_balance.map(item => (item.month.substring(0, 3))),
				series: [
					{
						name: "Entradas",
						color: "#20B74A",
						data: response.data.dashboard.monthly_balance.map(item => (item.income === null ? 0 : item.income))
					},
					{
						name: "Saídas",
						color: "#FA4F4F",
						data: response.data.dashboard.monthly_balance.map(item => (item.outcome === null ? 0 : item.outcome))
					}
				]
			}
			setDashboard({
				...response.data.dashboard,
				monthly_balance: monthlyBalance
			})
		}).catch(error => (
			setDashboard(null)
		))
	}

	function openTransactionModal(Transaction = null) {
		setEditTransaction(Transaction)
		setIsOpenTransactionModal(true)
	}

	function closeTransactionModal() {
		setEditTransaction(null)
		getTransactions()
		getDashboard();
		setIsOpenTransactionModal(false)
	}

	async function deleteTransaction(transactionId?: number) {
		const id = transactionId ? transactionId : editTransaction.id
		await api.delete(`transaction/delete/${id}`)
		getTransactions()
	}

	useEffect(() => {
		getTransactions()
		getDashboard()
	}, [period])

	useEffect(() => {
		const token = localStorage.getItem('@financapp:token')

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`

			getTransactions();
			getDashboard();
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
			deleteTransaction,
			summary,
			period,
			setPeriod,
			dashboard,
			getDashboard
		}}>
			{props.children}
		</TransactionContext.Provider>
	)
}

export const useTransaction = () => useContext(TransactionContext);