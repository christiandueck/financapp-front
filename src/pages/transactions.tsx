import Head from 'next/head'
import { Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { TransactionTable } from '../components/Transaction/TransactionTable'
import { useTransaction } from '../hooks/useTransaction'
import { useEffect } from 'react'
import { Summary } from '../components/Summary'
import { MonthSelector } from '../components/Filter/MonthSelector'

export default function Transactions() {
	const { transactions, summary, getTransactions } = useTransaction()

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
	})

	useEffect(() => {
		getTransactions()
	}, [])

	return (
		<Stack
			spacing={{ base: "1.5rem", lg: "3rem" }}
			align="center"
			my={{ base: "1rem", lg: "2rem" }}
			mx="auto"
			px={{ base: "1rem", lg: "1.5rem" }}
			w="100vw"
			maxW="85rem"
		>
			<Header />

			<Head>
				<title>Transações | FinançApp</title>
			</Head>

			<MonthSelector />

			{transactions === null
				? <Text>Nenhuma transação registrada.</Text>
				: <>
					<Summary income={summary.income} outcome={summary.outcome} />
					<TransactionTable isMobile={isMobile} />
				</>
			}
		</Stack>
	)
}