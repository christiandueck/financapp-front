import { Stack } from "@chakra-ui/layout"

import { RiArrowLeftRightLine, RiBankLine, RiBarChart2Line, RiFunctionLine } from "react-icons/ri"
import { NavLink } from "../NavLink"
import { AddTransactionButton } from "../Transaction/AddTransactionButton"
import { useBreakpointValue } from "@chakra-ui/react"

export function NavBar() {
	const showIcon = useBreakpointValue({
		base: true,
		lg: false,
		xl: true,
	})

	return (
		<Stack
			spacing={{ base: "2rem", lg: "1rem", xl: "2rem" }}
			align={{ base: "start", lg: "center" }}
			direction={{ base: "column", lg: "row" }}
		>
			<NavLink href="/dashboard" icon={showIcon ? RiBarChart2Line : null}>Dashboard</NavLink>
			<NavLink href="/accounts" icon={showIcon ? RiBankLine : null}>Contas</NavLink>
			<NavLink href="/categories" icon={showIcon ? RiFunctionLine : null}>Categorias</NavLink>
			<NavLink href="/transactions" icon={showIcon ? RiArrowLeftRightLine : null}>Transações</NavLink>
			<AddTransactionButton />
		</Stack>
	)
}