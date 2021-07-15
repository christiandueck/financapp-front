import { Stack } from "@chakra-ui/layout"

import { RiArrowLeftRightLine, RiBankLine, RiBarChart2Line, RiFunctionLine } from "react-icons/ri"
import { NavLink } from "../NavLink"
import { AddTransactionButton } from "../Transaction/AddTransactionButton"
import { useBreakpointValue } from "@chakra-ui/react"

export function NavBar() {
  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  })

  return (
    <Stack spacing="2rem" align={{ base: "start", lg: "center" }} direction={{ base: "column", lg: "row" }}>
      <NavLink href="/dashboard" icon={RiBarChart2Line}>Dashboard</NavLink>

      <NavLink href="/accounts" icon={RiBankLine}>Contas</NavLink>
      <NavLink href="/categories" icon={RiFunctionLine}>Categorias</NavLink>
      <NavLink href="/transactions" icon={RiArrowLeftRightLine}>Transações</NavLink>

      <AddTransactionButton />
    </Stack>
  )
}