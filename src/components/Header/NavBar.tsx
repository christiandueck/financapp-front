import { Stack } from "@chakra-ui/layout"

import { RiArrowLeftRightLine, RiBankLine, RiBarChart2Line, RiFunctionLine } from "react-icons/ri"
import { Link } from "../Link"
import { AddTransactionButton } from "../AddTransaction/AddTransactionButton"
import { useBreakpointValue } from "@chakra-ui/react"

export function NavBar() {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <Stack spacing="2rem" align={["start", "center"]} direction={["column", "row"]}>
      <Link icon={RiBarChart2Line} href="/dashboard">Dashboard</Link>

      <Link icon={RiBankLine} href="/accounts">Contas</Link>
      <Link icon={RiFunctionLine} href="/categories">Categorias</Link>
      <Link icon={RiArrowLeftRightLine} href="/transactions">Transações</Link>

      <AddTransactionButton />
    </Stack>
  )
}