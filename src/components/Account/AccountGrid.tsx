import { Stack, Text, Icon, Button, Grid, Flex } from '@chakra-ui/react'
import { RiEditLine } from 'react-icons/ri'
import { Account, accountTypes, useAccount } from '../../hooks/useAccount';

interface AccountGridProps {
	activeAccounts: boolean;
	data: Account[]
}

export function AccountGrid({ activeAccounts }: AccountGridProps) {
	const { accounts, openAccountModal } = useAccount()

	const filteredAccounts = accounts?.filter(account => (
		account.active === activeAccounts && account
	));

	return (
		<Grid
			w="100%"
			gap={{ base: "1rem", md: "2rem", xl: "3rem" }}
			templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
		>
			{filteredAccounts?.map(account => (
				<Flex
					flex={1}
					h="100%"
					alignItems="center"
					backgroundColor="gray.700"
					borderRadius="0.5rem"
					overflow="hidden"
					key={account.id}
				>
					<Flex
						w={{ base: "4rem", md: "5.5rem", xl: "7rem" }}
						h="100%"
						backgroundColor={account.color.hex_code}
						justifyContent="center"
						alignItems="center"
					>
						<Icon
							as={accountTypes.find(accountIcon => accountIcon.type === account.type)?.icon}
							w={{ base: "2rem", md: "2.5rem", xl: "3rem" }} h={{ base: "2rem", md: "2.5rem", xl: "3rem" }}
						/>
					</Flex>
					<Stack
						flex={1}
						padding={{ base: "1rem", md: "1.5rem", xl: "2rem" }}
						spacing="0.5rem"
					>
						<Text
							fontWeight="900"
							textTransform="uppercase"
							fontSize={{ base: "1.25rem", md: "1.5rem", lg: "1.75rem" }}
						>{account.name}</Text>

						{account.type !== 'card' &&
							<Flex
								justifyContent="space-between"
								flexDir={{ base: "column", md: "row", lg: "column", xl: "row" }}
								alignItems={{ base: "start", md: "center", lg: "start", xl: "center" }}
							>
								<Text
									fontSize={{ base: "1rem", md: "1.25rem", xl: "1.5rem" }}
									textTransform="uppercase"
								>Saldo atual:</Text>
								<Text
									fontSize={{ base: "1.25rem", md: "1.5rem" }}
									fontWeight="700"
									color={account.balance >= 0 ? "green.500" : "red.500"}
								>{(account.balance).toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL'
								})}</Text>
							</Flex>
						}
					</Stack>
					<Flex py="0.5rem" h="100%">
						<Button
							variant="unstyled"
							w="100%"
							h="100%"
							p={{ base: "1.5rem", md: "2rem" }}
							alignItems="center"
							borderLeft="1px solid"
							borderRadius={0}
							borderColor="gray.600"
							onClick={() => openAccountModal(account)}
						>
							<Icon as={RiEditLine} w={{ base: "1.5rem", md: "2rem" }} h={{ base: "1.5rem", md: "2rem" }} />
						</Button>
					</Flex>
				</Flex>
			))}
		</Grid>
	)
}