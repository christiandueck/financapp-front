import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon } from "@chakra-ui/react"
import { RiAddLine, RiCalendarLine } from "react-icons/ri"
import { useTransaction } from "../../contexts/TransactionContext"
import { Input } from "../Form/Input"
import { SelectAccount } from "./SelectAccount"
import { SelectCategory } from "./SelectCategory"
import { SelectTransaction } from "./SelectTransaction"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from "react"
import { useCategory } from "../../hooks/useCategory"

interface AddTransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type AddTransactionFormData = {
	amount: string;
	date: Date;
	description: string;
}

const addTransactionFormSchema = yup.object().shape({
	amount: yup.string().required('É necessário inserir um valor!')
})

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
	const { transaction, transactionDescription } = useTransaction()

	const { register, handleSubmit, formState, setValue, watch } = useForm({
		resolver: yupResolver(addTransactionFormSchema)
	})

	const [transactionType, setTransactionType] = useState<'income' | 'outcome' | 'transfer'>('income')
	const [amount, setAmount] = useState<number>(0)
	const [paymentDate, setPaymentDate] = useState<Date>()
	const [installments, setInstallments] = useState<number>(1)
	const [categoryId, setCategoryId] = useState<number>()
	const [originAccountId, setOriginAccountId] = useState<number>()
	const [destinyAccountId, setDestinyAccountId] = useState<number>()

	const handleSaveTransaction: SubmitHandler<AddTransactionFormData> = async (values) => {
		const transaction = {
			type: transactionType,
			amount: amount,
			date: values.date,
			payment_date: paymentDate.toISOString().split('T')[0],
			instalmments: installments,
			category_id: categoryId,
			origin_account_id: originAccountId,
			destiny_account_id: destinyAccountId || null,
		}

		console.log(transaction)
		/*if (editAccount !== null) {
			await api.post(`account/update/${editAccount.id}`, {
				...account,
				id: editAccount.id,
				active: editAccount.active
			}).catch((error) => {
				toast.error("Não foi possível cadastrar a conta, tente novamente!")
			})
		} else {
			await api.post('account/insert', account).catch((error) => {
				toast.error("Categoria já cadastrada!")
			})
		}*/

		//closeAccountModal()
	}

	const { errors } = formState

	useEffect(() => {
		setAmount(Number(watch('amount')?.replace(',', '').replace('.', '')) / 100 || 0)
	}, [watch('amount')])

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
			<ModalOverlay />
			<ModalContent
				bg="gray.800"
				p="1.5rem"
				overflow="hidden"
				borderRadius="1rem"
				as="form"
				onSubmit={handleSubmit(handleSaveTransaction)}
			>

				<ModalHeader p="0" mb="2rem">
					<HStack>
						<Icon as={RiAddLine} fontSize="1.5rem" />
						<Text textTransform="uppercase">Nova transação</Text>
					</HStack>
				</ModalHeader>
				<ModalCloseButton
					top="1.5rem"
					right="1.5rem"
					fontSize="1rem"
					color="gray.100"
				/>

				<ModalBody p="0">
					<Stack spacing="0.75rem">
						<SelectTransaction />

						<Input
							name="amount"
							type="text"
							inputMode="numeric"
							step="0.01"
							label="valor"
							suffix="R$"
							mask="currency"
							placeholder="0,00"
							error={errors.amount}
							{...register('amount')}
						/>

						<Input
							name="date"
							type="date"
							label={`Data da ${transactionDescription}`}
							icon={RiCalendarLine}
							error={errors.date}
							{...register('date')}
						/>

						{transaction !== 'income' &&
							<SelectAccount
								name="outcome_account"
								label="Conta de origem"
								transactionAmount={amount}
								setAccountId={setOriginAccountId}
								setInstallmentsCount={setInstallments}
								setPaymentDate={setPaymentDate}
							/>
						}

						{transaction !== 'outcome' &&
							<SelectAccount
								name="income_account"
								label="Conta de destino"
								transactionAmount={amount}
								setAccountId={setDestinyAccountId}
								setInstallmentsCount={setInstallments}
								setPaymentDate={setPaymentDate}
							/>
						}

						{transaction !== 'transfer' &&
							<SelectCategory name="category" label="Categoria" setCategoryId={setCategoryId} transaction={transaction} />
						}

						<Input
							name="description"
							type="text"
							label="Descrição"
							placeholder="Texto opcional..."
							error={errors.description}
							{...register('description')}
						/>


					</Stack>
				</ModalBody>

				<ModalFooter p="0" mt="2.5rem">
					<Button type="submit" isLoading={formState.isSubmitting} colorScheme="green" w="100%">
						Salvar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}