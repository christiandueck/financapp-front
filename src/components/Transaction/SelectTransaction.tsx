import { Stack, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RiArrowDownCircleFill, RiArrowLeftRightLine, RiArrowUpCircleFill } from 'react-icons/ri'
import { useAccount } from '../../hooks/useAccount'
import { SelectButton } from '../Form/SelectButton'

interface SelectTransactionProps {
	transanctionType: 'income' | 'outcome' | 'transfer';
	setTransactionType: (type: string) => void;
}

export function SelectTransaction({ transactionType, setTransactionType }) {
	const { activeAccounts } = useAccount()

	return (
		<Stack spacing="0">
			<Text fontSize="sm" color="gray.400" pl="0.5rem">TIPO DE TRANSAÇÃO:</Text>
			<Flex
				flexWrap="wrap"
				css={{
					gap: '0.5rem'
				}}
			>

				<SelectButton
					icon={{
						icon: RiArrowUpCircleFill,
						color: "green.500"
					}}
					active={transactionType === 'income'}
					onClick={() => setTransactionType('income')}
				>Entrada</SelectButton>

				<SelectButton
					icon={{
						icon: RiArrowDownCircleFill,
						color: "red.500"
					}}
					active={transactionType === 'outcome'}
					onClick={() => setTransactionType('outcome')}
				>Saída</SelectButton>

				{activeAccounts?.length > 1 &&
					<SelectButton
						icon={{
							icon: RiArrowLeftRightLine,
							color: "purple.300"
						}}
						active={transactionType === 'transfer'}
						onClick={() => setTransactionType('transfer')}
					>Transferência</SelectButton>
				}

			</Flex>
		</Stack>
	)
}