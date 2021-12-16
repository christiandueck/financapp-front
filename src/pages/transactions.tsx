import Head from 'next/head'
import { Stack, useBreakpointValue } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { TransactionTable } from '../components/Transaction/TransactionTable'

export default function Transactions() {

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
	})

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

			<TransactionTable isMobile={isMobile} />
		</Stack>
	)
}