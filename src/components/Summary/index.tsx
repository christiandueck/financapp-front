import { SimpleGrid } from '@chakra-ui/react'
import { RiArrowDownCircleFill, RiArrowUpCircleFill, RiMoneyDollarCircleFill } from 'react-icons/ri'
import { SummaryCard } from './SummaryCard'

interface SummaryProps {
  income: number;
  outcome: number;
}

export function Summary({ income, outcome }: SummaryProps) {
  return (
    <SimpleGrid flex="1" gap={{ base: "1rem", lg: "2rem" }} minChildWidth="20rem" align="flex-start" w="100%">
      <SummaryCard bg="rgba(255, 255, 255, 0.15)" icon={RiMoneyDollarCircleFill} label="Saldo" amount={income-outcome} coloredAmount />

      <SummaryCard bg="rgba(32, 183, 74, 0.1)" icon={RiArrowUpCircleFill} label="Entradas" amount={income} />
    
      <SummaryCard bg="rgba(250, 79, 79, 0.2)" icon={RiArrowDownCircleFill} label="Saídas" amount={outcome} />
  </SimpleGrid>
  )
}