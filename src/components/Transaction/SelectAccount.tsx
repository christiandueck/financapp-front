import { Center, FormControl, FormLabel, Icon, Button, Flex, HStack, Input as ChakraInput, IconButton, Text } from '@chakra-ui/react'
import { Badge } from '../Badge'
import { useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowUpSLine, RiBankCard2Line, RiBankLine, RiWalletLine } from 'react-icons/ri'
import { Account, useAccount } from '../../hooks/useAccount'
import { number } from 'yup/lib/locale'

interface SelectAccountProps {
	name: string;
	label?: string;
	transactionAmount: number;
	setAccountId: (id: number) => void;
	setInstallmentsCount: (count: number) => void;
	setPaymentDate: (date: string) => void;
	filterAccountId?: number;
}

export function SelectAccount({
	name, label, transactionAmount, setAccountId, setInstallmentsCount, setPaymentDate, filterAccountId
}: SelectAccountProps) {
	const { activeAccounts } = useAccount();

	let filteredAccounts = activeAccounts;
	if (filterAccountId) {
		filteredAccounts = activeAccounts.filter(item => item.id !== filterAccountId)
	}

	const accountType = ['bank', 'credit_card', 'cash']
	const icons = [RiBankLine, RiBankCard2Line, RiWalletLine]

	const [account, setAccount] = useState(filteredAccounts[0])
	const [showList, setShowList] = useState(false)
	const [installment, setInstallment] = useState<{ count: number, value: number }>({ count: 1, value: transactionAmount })
	const [invoicePaymentDate, setInvoicePaymentDate] = useState<Date>(invoiceDate())

	function invoiceDate() {
		const now = new Date()
		const dueDate = account?.invoice_due_date || 1
		const closingDate = account?.invoice_closing_date || 1
		let date

		if (account?.type === 'credit_card') {
			if (now.getDate() <= closingDate && now.getDate() > dueDate) {
				date = new Date(now.getFullYear(), now.getMonth() + 1, dueDate)
			} else {
				date = new Date(now.getFullYear(), now.getMonth() + 2, dueDate)
			}
		} else {
			date = now;
		}

		return date;
	}

	function changeInvoiceDate(aggregator: number) {
		const changedInvoiceDate = new Date(invoicePaymentDate.setMonth(invoicePaymentDate.getMonth() + aggregator))
		setInvoicePaymentDate(changedInvoiceDate)
	}

	function installments(installmentCount: number) {
		if (installmentCount >= 1 && installmentCount <= 12) {
			setInstallment({
				count: installmentCount,
				value: transactionAmount / installmentCount
			})
			setInstallmentsCount(installmentCount)
		}
	}

	function toggleShowList() {
		setShowList(!showList)
	}

	function changeAccount(account: Account) {
		setAccount(account)
		setShowList(false)
	}

	useEffect(() => {
		setInstallment(prev => ({
			count: prev.count,
			value: transactionAmount / prev.count
		}))
	}, [transactionAmount])

	useEffect(() => {
		setInstallmentsCount(installment.count)
	}, [installment])

	useEffect(() => {
		setAccountId(account?.id || activeAccounts[0]?.id)
		setInvoicePaymentDate(invoiceDate())
	}, [account])

	useEffect(() => {
		setAccount(filteredAccounts[0])
	}, [filterAccountId])

	useEffect(() => {
		const year = invoicePaymentDate.getFullYear()
		const month = invoicePaymentDate.toLocaleDateString('default', { month: '2-digit' })
		const day = invoicePaymentDate.toLocaleDateString('default', { day: '2-digit' })
		setPaymentDate(`${year}-${month}-${day}`)
	}, [invoicePaymentDate])

	return (
		<FormControl id={name}>
			{!!label && <FormLabel
				htmlFor={name}
				textTransform="uppercase"
				fontSize="sm"
				ml="0.5rem"
				mb="0"
				color="gray.400"
			>
				{label}:
			</FormLabel>}
			<Flex
				h="inherit"
				w="100%"
				variant="unstyled"
				bg="gray.600"
				borderRadius="0.5rem"
				overflow="hidden"
				boxShadow={showList ? "0 0 0 2px var(--chakra-colors-green-500)" : "none"}
			>
				<Flex flexDir="column" w="100%">
					<Flex h="2.5rem" align="center" justifyContent="space-between" onClick={toggleShowList} cursor="pointer">
						<HStack align="center" spacing="1.5rem">
							<Center
								h="2rem"
								w="4rem"
								borderRight="1px solid"
								borderColor="whiteAlpha.200"
								color="gray.100"
							>
								<Icon as={RiBankLine} fontSize="1.25rem" />
							</Center>

							<Badge name={account?.name} color={account?.color.hex_code} id={account?.id.toString()} icon={icons[accountType.indexOf(account?.type)]} />
						</HStack>

						<Icon
							mr="0.5rem"
							as={showList ? RiArrowUpSLine : RiArrowDownSLine}
							fontSize="2rem"
							color="gray.400"
						/>
					</Flex>

					{showList &&
						<Flex p="1rem" wrap="wrap" css={{ gap: "1rem" }} borderTop="1px solid" borderColor="whiteAlpha.200">
							{filteredAccounts.map((account) => {
								return (
									<Badge
										key={account?.id}
										name={account?.name}
										color={account?.color.hex_code}
										icon={icons[accountType.indexOf(account?.type)]}
										onClick={() => changeAccount(account)}
									/>
								)
							})}
						</Flex>
					}

					{account?.type === 'credit_card' &&
						<Flex borderTop="1px solid" borderColor="whiteAlpha.200" align="center">
							<Flex flex={1} h="2.5rem" borderRight="1px solid" borderColor="whiteAlpha.200" justify="space-between">
								<Button
									variant="unstyled"
									color="gray.400"
									_hover={{ color: 'gray.100' }}
									onClick={() => changeInvoiceDate(-1)}
								>
									<Icon as={RiArrowLeftSLine} fontSize="2rem" />
								</Button>

								<Button color="gray.200" variant="unstyled" _hover={{ color: 'white' }}>
									<HStack>
										<Text fontSize="0.8rem" fontWeight="normal">Fatura: </Text>
										<Text>{Intl.DateTimeFormat('pt-BR', {
											day: '2-digit',
											month: 'short'
										}).format(invoicePaymentDate).replace(' ', '').replace('.', '').replace('de ', '/')}</Text>
									</HStack>
								</Button>

								<Button
									variant="unstyled"
									color="gray.400"
									_hover={{ color: 'gray.100' }}
									onClick={() => changeInvoiceDate(+1)}
								>
									<Icon as={RiArrowRightSLine} fontSize="2rem" />
								</Button>
							</Flex>

							<Flex flex={1} h="2.5rem" justify="space-between">
								<Button
									variant="unstyled"
									color="gray.400"
									_hover={{ color: 'gray.100' }}
									onClick={() => installments(installment.count - 1)}
								>
									<Icon as={RiArrowLeftSLine} fontSize="2rem" />
								</Button>

								<Button color="gray.200" variant="unstyled" _hover={{ color: 'white' }}>
									<HStack>
										<Text>{installment.count}x</Text>
										<Text fontSize="0.8rem" fontWeight="normal">{installment.value.toLocaleString('pt-BR', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}</Text>
									</HStack>
								</Button>

								<Button
									variant="unstyled"
									color="gray.400"
									_hover={{ color: 'gray.100' }}
									onClick={() => installments(installment.count + 1)}
								>
									<Icon as={RiArrowRightSLine} fontSize="2rem" />
								</Button>
							</Flex>
						</Flex>
					}
				</Flex>
			</Flex>
		</FormControl>
	)
}