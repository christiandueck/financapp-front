import Head from 'next/head'
import { Stack, SimpleGrid, Flex, Text, Icon, useBreakpointValue, Spinner } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { AddAccountButton } from '../components/Account/AddAccountButton'
import { SelectButton } from '../components/Form/SelectButton'
import { RiArrowDownCircleFill, RiArrowUpCircleFill, RiToggleFill, RiToggleLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { useRouter } from 'next/dist/client/router'
import { useAccount } from '../hooks/useAccount'
import { AccountGrid } from '../components/Account/AccountGrid'

type AccountType = 'bank' | 'card' | 'cash'

export default function Accounts() {
	const { user } = useUser();
	const { accounts } = useAccount();
	const router = useRouter();

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
	})

	const [accountType, setAccountType] = useState<AccountType>('bank')
	const [activeAccounts, setActiveAccounts] = useState(true)
	const isLoading = false;

	function toggleActiveAccounts() {
		setActiveAccounts(!activeAccounts)
	}

	const error = false;

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
				position="relative"
			>
				<Header />

				<Head>
					<title>Contas | FinançApp</title>
				</Head>

				<Flex w="100%">
					<Stack spacing="3rem" direction={{ base: "column", md: "row" }} w={{ base: "100%", md: "auto" }}>
						{!isMobile && <AddAccountButton />}

						<Stack spacing={{ base: "1rem", md: "2rem" }} direction={{ base: "column", md: "row" }} w={{ base: "100%", md: "auto" }}>
							<Flex
								h="2.75rem"
								align="center"
								justify="center"
								pl="1rem"
								pr="0.75rem"
								boxShadow="inset 0px 0px 0px 3px #565E5E"
								borderRadius="0.5rem"
								cursor="pointer"
								onClick={toggleActiveAccounts}
								position="relative"
							>
								<Stack spacing="0.5rem" direction="row" align="center">
									<Text textTransform="uppercase" fontWeight="bold" fontSize="1rem">{activeAccounts ? "Contas Ativas" : "Contas Inativas"}</Text>
									<Icon as={activeAccounts ? RiToggleFill : RiToggleLine} fontSize="1.5rem" />
								</Stack>
							</Flex>
						</Stack>
					</Stack>
				</Flex>

				{isLoading ? (
					<Flex jusify="center">
						<Spinner />
					</Flex>
				) : error ? (
					<Flex justify="center">
						<Text>
							Não foi possível carregar as contas.
						</Text>
					</Flex>
				) : accounts?.length < 1 ?
					<Text>Nenhuma conta cadastrada.</Text>
					:
					(
						<AccountGrid data={accounts} activeAccounts={activeAccounts} />
					)}
			</Stack>

			{isMobile &&
				<Flex w="100%" position="fixed" bottom={0} px="1rem" pb="1rem" pt="2rem" flexDir="row-reverse" background="linear-gradient(180deg, rgba(46, 56, 56, 0) 0%, rgba(46, 56, 56, 0.95) 35%);">
					<AddAccountButton />
				</Flex>
			}
		</>
	)
}