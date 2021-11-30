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
	setPaymentDate: (date: Date) => void;
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

	const accountType = ['bank', 'card', 'cash']
	const icons = [RiBankLine, RiBankCard2Line, RiWalletLine]

	const [account, setAccount] = useState(filteredAccounts[0])
	const [showList, setShowList] = useState(false)
	const [installment, setInstallment] = useState<{ count: number, value: number }>({ count: 1, value: transactionAmount })
	const [invoicePaymentDate, setInvoicePaymentDate] = useState(invoiceDate())

	function invoiceDate() {
		const now = new Date()
		const dueDate = account?.invoice_due_date || 1
		const closingDate = account?.invoice_closing_date || 1

		if (account?.type === 'card') {
			if (now.getDay() <= closingDate && now.getDay() > dueDate) {
				return new Date(`${now.getMonth() + 1}/${dueDate}/${now.getFullYear()}`)
			} else {
				return new Date(`${now.getMonth() + 2}/${dueDate}/${now.getFullYear()}`)
			}
		}
	}

	function changeInvoice(aggregator: number) {
		setInvoicePaymentDate(new Date(invoicePaymentDate.setMonth(invoicePaymentDate.getMonth() + aggregator)))
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
		setAccountId(account?.id || 0)
		setInvoicePaymentDate(invoiceDate())
	}, [account])

	useEffect(() => {
		setPaymentDate(invoicePaymentDate)
	}, [invoicePaymentDate])

	useEffect(() => {
		setAccount(filteredAccounts[0])
	}, [filterAccountId])

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

					{account?.type === 'card' &&
						<Flex borderTop="1px solid" borderColor="whiteAlpha.200" align="center">
							<Flex flex={1} h="2.5rem" borderRight="1px solid" borderColor="whiteAlpha.200" justify="space-between">
								<Button
									variant="unstyled"
									color="gray.400"
									_hover={{ color: 'gray.100' }}
									onClick={() => changeInvoice(-1)}
								>
									<Icon as={RiArrowLeftSLine} fontSize="2rem" />
								</Button>

								<Button color="gray.200" variant="unstyled" _hover={{ color: 'white' }}>
									<HStack>
										<Text fontSize="0.8rem" fontWeight="normal">Fatura: </Text>
										<Text>{`${invoicePaymentDate?.getDate() || account?.invoice_closing_date}/${invoicePaymentDate?.toLocaleDateString('pt-BR', { month: 'short' }).replace(" ", "").replace(".", "") || new Date().setMonth(new Date().getMonth() + 1)}`}</Text>
									</HStack>
								</Button>

								<Button
									variant="unstyled"
									color="gray.400"
									_hover={{ color: 'gray.100' }}
									onClick={() => changeInvoice(+1)}
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