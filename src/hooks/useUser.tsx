import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
	id: number;
	name: string;
	email: string;
}

type UserContextData = {
	user: User | null;
	signIn: (token: string, user: User) => void;
	signOut: () => void;
	getUser: () => void;
}

export const UserContext = createContext({} as UserContextData)

type UserProvider = {
	children: ReactNode;
}

export function UserProvider(props: UserProvider) {
	const [user, setUser] = useState<User | null>(null)

	function signIn(token: string, user: User) {
		localStorage.setItem('@financapp:token', token);

		api.defaults.headers.common.authorization = `Bearer ${token}`

		setUser(user);
	}

	function signOut() {
		setUser(null);
		localStorage.removeItem('@financapp:token')
	}

	function getUser() {
		api.get('/user/get').then(response => {
			setUser(response.data.message)
		}).catch((error) => {
			signOut()
		})
	}

	useEffect(() => {
		const token = localStorage.getItem('@financapp:token')

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`

			getUser();
		}
	}, [])

	return (
		<UserContext.Provider value={{
			user,
			signIn,
			signOut,
			getUser
		}}>
			{props.children}
		</UserContext.Provider>
	)
}

export const useUser = () => (useContext(UserContext))