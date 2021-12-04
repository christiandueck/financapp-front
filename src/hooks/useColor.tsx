import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "./useUser";

export type Color = {
	id: number;
	name: string;
	hex_code: string;
}

type ColorContextData = {
	colors: Color[],
}

export const ColorContext = createContext({} as ColorContextData)

type ColorProvider = {
	children: ReactNode;
}

export function ColorProvider(props: ColorProvider) {
	const { user } = useUser();

	const [colors, setColors] = useState<Color[] | null>(null)

	useEffect(() => {
		const token = localStorage.getItem('@financapp:token')

		if (token) {
			if (user) {
				api.defaults.headers.common.authorization = `Bearer ${token}`

				api.get('colors').then(response => {
					setColors(response.data.colors)
				})
			}
		}
	}, [user])

	return (
		<ColorContext.Provider value={{ colors }}>
			{props.children}
		</ColorContext.Provider>
	)
}

export const useColor = () => useContext(ColorContext);