import { Stack, Flex, Text, Icon, Table, Thead, Tbody, Tr, Th, Td, Button, Tooltip } from '@chakra-ui/react'
import { RiEditLine, RiDeleteBin2Line, RiArrowDownCircleFill, RiArrowUpCircleFill, RiArrowLeftRightLine } from 'react-icons/ri'
import { useColor } from '../../hooks/useColor';
import { Transaction, useTransaction } from '../../hooks/useTransaction';
import { Badge } from '../Badge';
import { format } from 'date-fns';
import { currency } from '../Form/InputMasks';
import { accountTypes } from '../../hooks/useAccount';

interface TransactionTableProps {
	isMobile: boolean;
}

export function TransactionTable({ isMobile }: TransactionTableProps) {
	const { transactions, openTransactionModal, deleteTransaction } = useTransaction()

	return (
		<Table>
			<Thead>
				<Tr>
					<Th
						fontWeight="bold"
						fontSize="1rem"
						color="white"
						borderBottom="2px"
						borderColor="#20B74A"
						px={{ base: "0.5rem", md: "1rem", lg: "2rem" }}
						py="0.5rem"
					>Descrição</Th>
					{!isMobile && <>
						<Th
							fontWeight="bold"
							fontSize="1rem"
							color="white"
							borderBottom="2px"
							borderColor="#20B74A"
							py="0.5rem"
							textAlign="center"
						>Categoria</Th>
						<Th
							fontWeight="bold"
							fontSize="1rem"
							color="white"
							borderBottom="2px"
							borderColor="#20B74A"
							py="0.5rem"
							textAlign="center"
						>Conta</Th>
						<Th
							fontWeight="bold"
							fontSize="1rem"
							color="white"
							borderBottom="2px"
							borderColor="#20B74A"
							py="0.5rem"
							textAlign="center"
						>Data</Th>
					</>}
					<Th
						fontWeight="bold"
						fontSize="1rem"
						color="white"
						w="7rem"
						minW="7rem"
						borderBottom="2px"
						borderColor="#20B74A"
						p="0.5rem"
						textAlign="right"
					>Valor (R$)</Th>
					{!isMobile &&
						<Th
							fontWeight="bold"
							fontSize="1rem"
							color="white"
							borderBottom="2px"
							borderColor="#20B74A"
							py="0.5rem"
							textAlign="right"
							minW="6rem"
						>Ações</Th>}
				</Tr>
			</Thead>

			<Tbody>
				{transactions?.map(transaction =>
				(
					<Tr key={transaction.id}>
						{isMobile
							? <>
								<Td p="0.5rem" borderColor="whiteAlpha.200">
									<Stack spacing={0}>
										<Stack spacing="0.5rem" direction="row" align="center">
											<Text>
												{transaction.description !== '' ? transaction.description : transaction.type === 'transfer' ? "Transferência" : transaction.category.name}
												{transaction.installment !== '1\/1' ? ` (${transaction.installment})` : ''}
											</Text>
										</Stack>

										<Stack direction="row" align="center" color="gray.400" fontSize="0.875rem">
											{transaction.type !== 'transfer' && <Text>{`${transaction.category.name} | `}</Text>}
											<Icon as={accountTypes[accountTypes.map(e => e.type).indexOf(transaction.account.type)].icon} />
											<Text>{transaction?.account.name}</Text>

											{transaction.type === 'transfer' && <Text>→</Text>}
											{transaction.type === 'transfer' &&
												<Icon as={accountTypes[accountTypes.map(e => e.type).indexOf(transaction.destiny_account.type)].icon} />
											}
											{transaction.type === 'transfer' && <Text>{transaction?.destiny_account.name}</Text>}
										</Stack>

										<Text color="gray.400" fontSize="0.875rem">
											{format(new Date(transaction.date), 'dd/MM/yyyy')}
										</Text>
									</Stack>
								</Td>

								<Td
									px="0.5rem"
									borderColor="whiteAlpha.200"
								>
									<Stack>
										<Flex flexDir="row-reverse" alignItems="center">
											<Icon marginLeft="0.5rem" as={transaction.type === 'income' ? RiArrowUpCircleFill
												: transaction.type === 'outcome' ? RiArrowDownCircleFill
													: RiArrowLeftRightLine
											} fontSize="1rem" color={transaction.type === 'income' ? 'green.500'
												: transaction.type === 'outcome' ? 'red.500' : 'purple.300'} />
											<Text
												color={transaction.type === 'income' ? "green.500" : transaction.type === 'outcome' ? "red.500" : "white"}
											>{transaction.amount.toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})}</Text>
										</Flex>

										<Flex justify="flex-end">

											{transaction.account.type === 'credit_card'
												? <Tooltip label='Funcionalidade ainda não implementada'>
													<Button variant="unstyled" opacity={0.3} cursor="not-allowed" p="0.1rem">
														<Icon as={RiEditLine} w="1.5rem" h="1.5rem" />
													</Button>
												</Tooltip>
												: <Button variant="unstyled" onClick={() => { openTransactionModal(transaction) }} p="0.1rem">
													<Icon as={RiEditLine} w="1.5rem" h="1.5rem" />
												</Button>
											}

											{transaction.account.type === 'credit_card'
												? <Tooltip label='Funcionalidade ainda não implementada'>
													<Button variant="unstyled" opacity={0.3} cursor="not-allowed" p="0.1rem">
														<Icon as={RiDeleteBin2Line} w="1.5rem" h="1.5rem" />
													</Button>
												</Tooltip>
												:
												<Button variant="unstyled" onClick={() => { deleteTransaction(transaction.id) }} p="0.1rem">
													<Icon as={RiDeleteBin2Line} w="1.5rem" h="1.5rem" />
												</Button>
											}
										</Flex>
									</Stack>
								</Td>
							</>
							: <>
								<Td
									colSpan={transaction.type === 'transfer' ? 3 : 1}
									px={{ base: "0.5rem", md: "1rem", lg: "2rem" }}
									borderColor="whiteAlpha.200"
								>
									<Stack spacing="0.5rem" direction="row" align="center">
										<Text>
											{transaction.description !== '' ? transaction.description : transaction.type === 'transfer' ? "Transferência" : transaction.category.name}
											{transaction.installment !== '1\/1' ? ` (${transaction.installment})` : ''}
										</Text>

										{transaction.type === 'transfer' &&
											<Stack direction="row" align="center" pl="0.5rem">
												<Icon as={accountTypes[accountTypes.map(e => e.type).indexOf(transaction.account.type)]?.icon || null} />
												<Text fontWeight="700">{transaction?.account.name}</Text>
												<Text>→</Text>
												<Icon as={accountTypes[accountTypes.map(e => e.type).indexOf(transaction.destiny_account?.type)]?.icon || null} />
												<Text fontWeight="700">{transaction?.destiny_account?.name}</Text>
											</Stack>
										}
									</Stack>
								</Td>

								{transaction.type !== 'transfer' &&
									<Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200" textAlign="center">
										<Badge name={transaction.category.name} color={transaction.category.color?.hex_code} />
									</Td>
								}

								{transaction.type !== 'transfer' &&
									<Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200" textAlign="center">
										<Badge
											name={transaction?.account.name}
											color={transaction.account.color?.hex_code}
											icon={accountTypes[accountTypes.map(e => e.type).indexOf(transaction.account.type)].icon}
										/>
									</Td>
								}

								<Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200" textAlign="center">
									<Text>{format(new Date(transaction.date), 'dd/MM/yyyy')}</Text>
								</Td>

								<Td
									px="0.5rem"
									borderColor="whiteAlpha.200"
								>
									<Flex flexDir="row-reverse" alignItems="center">
										<Icon marginLeft="0.5rem" as={transaction.type === 'income' ? RiArrowUpCircleFill
											: transaction.type === 'outcome' ? RiArrowDownCircleFill
												: RiArrowLeftRightLine
										} fontSize="1rem" color={transaction.type === 'income' ? 'green.500'
											: transaction.type === 'outcome' ? 'red.500' : 'purple.300'} />
										<Text
											color={transaction.type === 'income' ? "green.500" : transaction.type === 'outcome' ? "red.500" : "white"}
										>{transaction.amount.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})}</Text>
									</Flex>
								</Td>

								<Td
									w="4rem"
									borderColor="whiteAlpha.200"
									h="3rem"
									py={0}
									px={{ base: "0.5rem", md: "1rem" }}
								>
									<Flex justify="flex-end">

										{transaction.account.type === 'credit_card'
											? <Tooltip label='Funcionalidade ainda não implementada'>
												<Button variant="unstyled" opacity={0.3} cursor="not-allowed">
													<Icon as={RiEditLine} w="1.5rem" h="1.5rem" />
												</Button>
											</Tooltip>
											: <Button variant="unstyled" onClick={() => { openTransactionModal(transaction) }}>
												<Icon as={RiEditLine} w="1.5rem" h="1.5rem" />
											</Button>
										}

										{transaction.account.type === 'credit_card'
											? <Tooltip label='Funcionalidade ainda não implementada'>
												<Button variant="unstyled" opacity={0.3} cursor="not-allowed">
													<Icon as={RiDeleteBin2Line} w="1.5rem" h="1.5rem" />
												</Button>
											</Tooltip>
											:
											<Button variant="unstyled" onClick={() => { deleteTransaction(transaction.id) }}>
												<Icon as={RiDeleteBin2Line} w="1.5rem" h="1.5rem" />
											</Button>
										}
									</Flex>
								</Td>
							</>
						}
					</Tr>
				)
				)}
			</Tbody>
		</Table>
	)
}