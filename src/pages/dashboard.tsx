import Head from 'next/head'
import { Box, Center, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { DonutChart } from '../components/Charts/DonutChart'
import { BarChart } from '../components/Charts/BarChart'
import { MonthSelector } from '../components/Filter/MonthSelector'
import { Summary } from '../components/Summary'
import { useState } from 'react'
import { useMonth } from '../contexts/MonthContext'
import { useEffect } from 'react'

type DashboardData = {
  month: number;
  year: number;
  balance: {
    income: number;
    outcome: number;
  }
  monthlyExpenses: {
    name: string;
    amount: number;
    color: string;
  }[],
  montlyBalance: {
    xaxis: string[];
    series: {
      name: string;
      data: number[];
      color: string;
    }[]
  }
}

export default function Dashboard() {

  const { month, year } = useMonth()

  const [data, setData] = useState<DashboardData>()

  useEffect(() => {
    let jsonData: DashboardData = null
    try {
      jsonData = require(`../json/${year}-${month}.json`)
    } catch {
      
    }

    setData(jsonData)
  }, [month, year])

  useEffect(() => {
    setData(require('../json/2021-7.json'))
  }, [])

  return (
    <Stack
      spacing="3rem"
      align="center"
      my={{ base: "1rem", lg: "2rem" }}
      mx="auto"
      px={{ base: "1rem", lg: "1.5rem" }}
      w="100vw"
      maxW="85rem"
    >
      <Header />

      <Head>
        <title>Dashboard | FinançApp</title>
      </Head>

      <MonthSelector />

      {data ? <>
      <Summary income={data.balance.income} outcome={data.balance.outcome} />

      <SimpleGrid flex="1" gap={{ base: "1rem", lg: "2rem" }} minChildWidth="20rem" align="flex-start" w="100%">
        <Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
          <Center mb={{ base: "1rem", lg: "2rem" }}>
            <Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Despesas por categoria</Text>
          </Center>
          
          <DonutChart data={data.monthlyExpenses} />
        </Box>

        <Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
          <Center mb={{ base: "1rem", lg: "2rem" }}>
            <Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Entradas e Saídas</Text>
          </Center>

          <BarChart data={data.montlyBalance} />
        </Box>
      </SimpleGrid>
      </> : 
      <Center>
        Não há dados para exibir.
      </Center>
      }
    </Stack>
  )
}