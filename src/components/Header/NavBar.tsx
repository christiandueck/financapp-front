import { Stack } from "@chakra-ui/layout"

import { RiArrowLeftRightLine, RiBankLine, RiBarChart2Line, RiFunctionLine } from "react-icons/ri"
import { Link } from "../Link"
import { AddTransactionButton } from "../AddTransactionButton"
import { useBreakpointValue } from "@chakra-ui/react"

export function NavBar() {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <Stack spacing="2rem" align={["start", "center"]} direction={["column", "row"]}>
      <Link icon={RiBarChart2Line} active>Dashboard</Link>

      <Link icon={RiBankLine}>Contas</Link>
      <Link icon={RiFunctionLine}>Categorias</Link>
      <Link icon={RiArrowLeftRightLine}>Transações</Link>

      <AddTransactionButton />
    </Stack>
  )
}