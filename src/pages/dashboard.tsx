import Head from 'next/head'
import { Box, Center, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { DonutChart } from '../components/Charts/DonutChart'
import { BarChart } from '../components/Charts/BarChart'

const monthlyExpenses = [
  {
    name: 'Aluguel',
    amount: 976,
    color: '#F51D1D'
  },
  {
    name: 'Transporte',
    amount: 326,
    color: '#20B74A'
  },
  {
    name: 'Mercado',
    amount: 628,
    color: '#1DB4F5'
  },
  {
    name: 'Comunicação',
    amount: 150,
    color: '#961DF5'
  },
  {
    name: 'Luz',
    amount: 98,
    color: '#F5781D'
  }
]

const montlyBalance = {
  xaxis: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  series: [{
    name: 'Entradas',
    data: [3152, 3412, 3000, 2645, 3152, 3412]
  }, {
    name: 'Saídas',
    data: [1912, 3150, 2462, 3121, 1998, 2412]
  }]
}


export default function Dashboard() {
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

      <SimpleGrid flex="1" gap={{ base: "1rem", lg: "2rem" }} minChildWidth="20rem" align="flex-start" w="100%">
        <Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
          <Center mb={{ base: "1rem", lg: "2rem" }}>
            <Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Despesas por categoria</Text>
          </Center>
          
          <DonutChart data={monthlyExpenses} />
        </Box>

        <Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
          <Center mb={{ base: "1rem", lg: "2rem" }}>
            <Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Entradas e Saídas</Text>
          </Center>

          <BarChart data={montlyBalance} />
        </Box>
      </SimpleGrid>
    </Stack>
  )
}