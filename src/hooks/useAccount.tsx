import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "./useUser";
import { Color } from "./useColor";
import { RiBankLine, RiBankCardLine, RiWalletLine } from "react-icons/ri";
import { IconType } from "react-icons";

export type Account = {
	id: number;
	name: string;
	type: 'bank' | 'card' | 'cash';
	color: Color;
	balance: number;
	limit: number;
	invoice_closing_date: number;
	invoice_due_date: number;
	active: boolean;
}

export type AccountType = {
	type: 'bank' | 'card' | 'cash' | string;
	label: string;
	icon: IconType;
}

export const accountTypes = [
	{ type: 'bank', label: 'Banco', icon: RiBankLine },
	{ type: 'card', label: 'Cartão de Crédito', icon: RiBankCardLine },
	{ type: 'cash', label: 'Espécie', icon: RiWalletLine },
]


type AccountContextData = {
	accounts: Account[],
	activeAccounts: Account[],
	getAccounts: () => void;
	openAccountModal: (account?: Account | null) => void;
	closeAccountModal: () => void;
	isOpenAccountModal: boolean;
	editAccount: Account;
	deactivateAccount: (AccountId?: number) => void;
}

export const AccountContext = createContext({} as AccountContextData)

type AccountProvider = {
	children: ReactNode;
}

export function AccountProvider(props: AccountProvider) {
	const { user } = useUser();

	const [accounts, setAccounts] = useState<Account[] | null>(null)
	const [activeAccounts, setActiveAccounts] = useState<Account[] | null>(null)
	const [editAccount, setEditAccount] = useState<Account | null>(null)
	const [isOpenAccountModal, setIsOpenAccountModal] = useState(false)

	async function getAccounts() {
		await api.get('account/get/all').then(response => {
			const sortedAccounts = response.data.accounts.sort((a, b) => (
				a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
			)
			setAccounts(sortedAccounts)
			setActiveAccounts(sortedAccounts.filter(item => item.active === true))
		})
	}

	function openAccountModal(account = null) {
		setEditAccount(account)
		setIsOpenAccountModal(true)
	}

	function closeAccountModal() {
		setEditAccount(null)
		getAccounts()
		setIsOpenAccountModal(false)
	}

	async function deactivateAccount(AccountId?: number) {
		const id = AccountId ? AccountId : editAccount.id
		await api.delete(`account/delete/${id}`)
		getAccounts()
		setEditAccount(prev => ({
			...prev,
			active: accounts.find(item => item.id === prev.id).active
		}))
	}

	useEffect(() => {
		const token = localStorage.getItem('@financapp:token')

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`

			getAccounts();
		}
	}, [user])

	return (
		<AccountContext.Provider value={{
			accounts,
			activeAccounts,
			getAccounts,
			openAccountModal,
			closeAccountModal,
			isOpenAccountModal,
			editAccount,
			deactivateAccount
		}}>
			{props.children}
		</AccountContext.Provider>
	)
}

export const useAccount = () => useContext(AccountContext);