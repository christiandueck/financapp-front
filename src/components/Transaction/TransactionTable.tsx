import { Stack, Flex, Text, Icon, Table, Thead, Tbody, Tr, Th, Td, Circle, Button } from '@chakra-ui/react'
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
						{console.log(transaction)}
						<Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200">
							<Stack spacing="0.5rem" direction="row" align="center">
								<Text>{transaction.description !== '' ? transaction.description : transaction.category.name}</Text>
							</Stack>
						</Td>

						<Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200" textAlign="center">
							<Badge name={transaction.category.name} color={transaction.category.color?.hex_code} />
						</Td>

						<Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200" textAlign="center">
							<Badge
								name={transaction?.account.name}
								color={transaction.account.color?.hex_code}
								icon={accountTypes[accountTypes.map(e => e.type).indexOf(transaction.account.type)].icon}
							/>
						</Td>

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
								<Button variant="unstyled" onClick={() => { openTransactionModal(transaction) }}>
									<Icon as={RiEditLine} w="1.5rem" h="1.5rem" />
								</Button>

								<Button variant="unstyled" onClick={() => { deleteTransaction(transaction.id) }}>
									<Icon as={RiDeleteBin2Line} w="1.5rem" h="1.5rem" />
								</Button>
							</Flex>
						</Td>
					</Tr>
				)
				)}
			</Tbody>
		</Table>
	)
}