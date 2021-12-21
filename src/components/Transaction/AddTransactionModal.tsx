import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon } from "@chakra-ui/react"
import { RiAddLine, RiCalendarLine } from "react-icons/ri"
import { useTransaction, TransactionTypes } from "../../hooks/useTransaction"
import { Input } from "../Form/Input"
import { SelectAccount } from "./SelectAccount"
import { SelectCategory } from "./SelectCategory"
import { SelectTransaction } from "./SelectTransaction"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from "react"
import { format } from 'date-fns'
import { api } from "../../services/api"
import { useAccount } from "../../hooks/useAccount"
import { Calendar, CalendarDate } from '@uselessdev/datepicker'
import { ptBR } from 'date-fns/locale'
import { DatePicker } from "../Form/DatePicker"
import { useCategory } from "../../hooks/useCategory"

type AddTransactionFormData = {
	amount: string;
	date: Date;
	description: string;
}

const addTransactionFormSchema = yup.object().shape({
	amount: yup.string().required('É necessário inserir um valor!')
})

export function AddTransactionModal() {
	const { isOpenTransactionModal, editTransaction, closeTransactionModal } = useTransaction()
	const { activeAccounts } = useAccount()
	const { activeCategories } = useCategory()

	const { register, handleSubmit, formState, setValue, watch } = useForm({
		resolver: yupResolver(addTransactionFormSchema)
	})

	const [transactionType, setTransactionType] = useState<'income' | 'outcome' | 'transfer'>('income')
	const [amount, setAmount] = useState<number>(0)
	const [date, setDate] = useState<CalendarDate>(new Date())
	const [paymentDate, setPaymentDate] = useState<string>()
	const [installments, setInstallments] = useState<number>(1)
	const [categoryId, setCategoryId] = useState<number>()
	const [originAccountId, setOriginAccountId] = useState<number>()
	const [destinyAccountId, setDestinyAccountId] = useState<number>()

	const handleSaveTransaction: SubmitHandler<AddTransactionFormData> = async (values) => {
		let transaction;

		if (transactionType === 'transfer') {
			transaction = {
				type: transactionType,
				amount: amount,
				date: format(date, 'yyyy-MM-dd'),
				invoice_first_charge: paymentDate || format(date, 'yyyy-MM-dd'),
				installments: 1,
				category_id: categoryId,
				origin_account_id: originAccountId || activeAccounts[0].id,
				destiny_account_id: destinyAccountId,
				description: values.description,
			}
		} else {
			transaction = {
				type: transactionType,
				amount: amount,
				date: format(date, 'yyyy-MM-dd'),
				invoice_first_charge: paymentDate || format(date, 'yyyy-MM-dd'),
				installments: installments || 1,
				category_id: categoryId,
				origin_account_id: originAccountId || activeAccounts[0].id,
				description: values.description,
			}
		}

		if (editTransaction !== null) {
			await api.post(`transaction/update/${editTransaction.id}`, {
				...transaction,
				id: editTransaction.id,
				payment_id: editTransaction.payment_id,
			}).catch((error) => {
				//toast.error("Não foi possível cadastrar a conta, tente novamente!")
			})
		} else {
			await api.post('transaction/insert', transaction).catch((error) => {
				//toast.error("Categoria já cadastrada!")
			})
		}

		closeTransactionModal()
	}

	const { errors } = formState

	useEffect(() => {
		setAmount(Number(watch('amount')?.replace(',', '').replace('.', '')) / 100 || 0)
	}, [watch('amount')])

	useEffect(() => {
		if (editTransaction !== null) {
			setTransactionType(editTransaction.type)
			setDate(new Date(editTransaction.date))
			setValue('amount', editTransaction.amount.toFixed(2).toString().replace('.', ','))
			setValue('description', editTransaction.description)
			setCategoryId(editTransaction.category.id)
			setOriginAccountId(editTransaction.account.id)
			setDestinyAccountId(editTransaction.destiny_account?.id || null)
		} else {
			setTransactionType('income')
			setDate(new Date())
			setValue('amount', '')
			setValue('description', '')
			setOriginAccountId(activeAccounts ? activeAccounts[0].id : null)
			setCategoryId(activeCategories ? activeCategories.filter(category => category.type === transactionType)[0]?.id : null)
		}
	}, [isOpenTransactionModal])

	return (
		<Modal isOpen={isOpenTransactionModal} onClose={closeTransactionModal} isCentered size="xl" scrollBehavior="inside">
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
						<SelectTransaction transactionType={transactionType} setTransactionType={setTransactionType} disabled={editTransaction === null ? false : true} />

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

						<DatePicker
							label={`Data da ${TransactionTypes.filter((item) => (item.type === transactionType))[0].label}`}
							date={date}
							setDate={setDate}
							icon={RiCalendarLine}
						/>

						{transactionType !== 'income' &&
							<SelectAccount
								name="outcome_account"
								label="Conta de origem"
								transactionAmount={amount}
								accountId={originAccountId}
								setAccountId={setOriginAccountId}
								setInstallmentsCount={setInstallments}
								setPaymentDate={setPaymentDate}
							/>
						}

						{transactionType !== 'outcome' &&
							<SelectAccount
								name="income_account"
								label="Conta de destino"
								transactionAmount={amount}
								accountId={transactionType === 'transfer' ? destinyAccountId : originAccountId}
								setAccountId={setDestinyAccountId}
								setInstallmentsCount={setInstallments}
								setPaymentDate={setPaymentDate}
								filterAccountId={transactionType === 'transfer' ? originAccountId : null}
							/>
						}

						{transactionType !== 'transfer' &&
							<SelectCategory name="category" label="Categoria" categoryId={categoryId} setCategoryId={setCategoryId} transaction={transactionType} />
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