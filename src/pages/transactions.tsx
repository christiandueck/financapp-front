import Head from 'next/head'
import { Flex, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { TransactionTable } from '../components/Transaction/TransactionTable'
import { useTransaction } from '../hooks/useTransaction'
import { useEffect } from 'react'
import { Summary } from '../components/Summary'
import { MonthSelector } from '../components/Filter/MonthSelector'
import { AddTransactionButton } from '../components/Transaction/AddTransactionButton'
import { useRouter } from 'next/dist/client/router'
import { useUser } from '../hooks/useUser'

export default function Transactions() {
	const { user } = useUser()
	const { transactions, summary, getTransactions } = useTransaction()

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
	})

	const router = useRouter()

	useEffect(() => {
		getTransactions()
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
				pb={{ base: "3.5rem", md: 0 }}
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

			{isMobile &&
				<Flex w="100%" position="fixed" bottom={0} px="1rem" pb="1rem" pt="2rem" flexDir="row-reverse" background="linear-gradient(180deg, rgba(46, 56, 56, 0) 0%, rgba(46, 56, 56, 0.95) 35%);">
					<AddTransactionButton />
				</Flex>
			}
		</>
	)
}