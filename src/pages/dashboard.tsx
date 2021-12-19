import Head from 'next/head'
import { Box, Center, SimpleGrid, Stack, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { DonutChart } from '../components/Charts/DonutChart'
import { BarChart } from '../components/Charts/BarChart'
import { MonthSelector } from '../components/Filter/MonthSelector'
import { Summary } from '../components/Summary'
import { useState } from 'react'
import { useEffect } from 'react'
import { AddTransactionButton } from '../components/Transaction/AddTransactionButton'
import { useRouter } from 'next/dist/client/router'
import { useUser } from '../hooks/useUser'
import { useTransaction } from '../hooks/useTransaction'

export default function Dashboard() {
	const { user } = useUser();
	const { dashboard, summary, getTransactions, getDashboard } = useTransaction();

	const isMobile = useBreakpointValue({
		base: true,
		lg: false,
	})

	const router = useRouter()

	useEffect(() => {
		getTransactions()
		getDashboard()
	}, [])

	useEffect(() => {
		if (!user) {
			router.push('/')
		}
	}, [user])

	return (
		<>
			<Stack
				spacing={{ base: "1.5rem", lg: "3rem" }}
				align="center"
				my={{ base: "1rem", lg: "2rem" }}
				mx="auto"
				px={{ base: "1rem", lg: "1.5rem" }}
				pb={{ base: "4rem", lg: 0 }}
				w="100vw"
				maxW="85rem"
			>
				<Header />

				<Head>
					<title>Dashboard | FinançApp</title>
				</Head>

				<MonthSelector />

				{dashboard ? <>
					<Summary income={summary.income} outcome={summary.outcome} />

					<SimpleGrid flex="1" gap={{ base: "1rem", lg: "2rem" }} minChildWidth="20rem" align="flex-start" w="100%">
						<Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
							<Center mb={{ base: "1rem", lg: "2rem" }}>
								<Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Despesas por categoria</Text>
							</Center>

							<DonutChart data={dashboard.month_expenses} />
						</Box>

						<Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
							<Center mb={{ base: "1rem", lg: "2rem" }}>
								<Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Entradas e Saídas</Text>
							</Center>

							<BarChart data={dashboard.monthly_balance} />
						</Box>
					</SimpleGrid>
				</> :
					<Center>
						Não há dados para exibir.
					</Center>
				}
			</Stack>
			{isMobile &&
				<Flex w="100%" position="fixed" bottom={0} px="1rem" pb="1rem" pt="2rem" flexDir="row-reverse" background="linear-gradient(180deg, rgba(46, 56, 56, 0) 0%, rgba(46, 56, 56, 0.95) 35%);">
					<AddTransactionButton />
				</Flex>
			}
		</>
	)
}