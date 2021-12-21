import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon, FormLabel, FormControl, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { RiAddLine, RiCalendarLine, RiEditLine } from "react-icons/ri"
import { Input } from "../Form/Input"
import { SelectColorButton } from "../Form/SelectColorButton"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "../../services/api"
import { useAccount, accountTypes } from "../../hooks/useAccount"
import { Color, useColor } from "../../hooks/useColor"
import { toast, ToastContainer } from 'react-toastify';
import { SelectAccountType } from "../Account/SelectAccountType";


type AddAccountFormData = {
	type: 'bank' | 'credit_card' | 'cash';
	name: string;
	balance: string;
	invoice_closing_date: string;
	invoice_due_date: string;
	color_id: number;
}

const addAccountFormSchema = yup.object().shape({
	credit_card: yup.number(),
	name: yup.string().required('Nome é obrigatório'),
	invoice_closing_date: yup.string().when('credit_card', {
		is: 1,
		then: yup.number().transform(value => (isNaN(value) ? 1 : value)).min(1, 'O valor precisa ser entre 1 e 31').max(31, 'O valor precisa ser entre 1 e 31')
	}),
	invoice_due_date: yup.string().when('credit_card', {
		is: 1,
		then: yup.number().transform(value => (isNaN(value) ? 1 : value)).min(1, 'O valor precisa ser entre 1 e 31').max(31, 'O valor precisa ser entre 1 e 31')
	}),
})

export function AddAccountModal() {
	const { colors } = useColor();
	const { editAccount, deactivateAccount, closeAccountModal, isOpenAccountModal } = useAccount()
	const [accountType, setAccountType] = useState(accountTypes[0].type)
	const [activeColor, setActiveColor] = useState<Color | null>(colors ? colors[0] : null);

	const { register, handleSubmit, formState, setValue } = useForm({
		resolver: yupResolver(addAccountFormSchema)
	})

	const handleSaveAccount: SubmitHandler<AddAccountFormData> = async (values) => {
		console.log(values)

		const account = {
			type: accountType,
			name: values.name,
			balance: values.balance ? Number(values.balance.replace(".", "").replace(",", ".")) : 0,
			invoice_due_date: Number(values.invoice_due_date) === 0 || values.invoice_due_date === '' ? 1 : Number(values.invoice_due_date),
			invoice_closing_date: Number(values.invoice_closing_date) === 0 || values.invoice_closing_date === '' ? 1 : Number(values.invoice_closing_date),
			color_id: activeColor.id,
		}

		if (editAccount !== null) {
			await api.post(`account/update/${editAccount.id}`, {
				...account,
				id: editAccount.id,
				active: editAccount.active
			}).catch((error) => {
				toast.error("Não foi possível cadastrar a conta, tente novamente!")
			})
		} else {
			await api.post('account/insert', account).catch((error) => {
				toast.error("Conta já cadastrada!")
			})
		}

		closeAccountModal()
	}

	async function reactivate() {
		await api.post(`account/update/${editAccount.id}`, {
			id: editAccount.id,
			name: editAccount.name,
			type: accountType,
			color_id: activeColor.id,
			balance: editAccount.balance,
			invoice_due_date: editAccount.invoice_due_date,
			invoice_closing_date: editAccount.invoice_closing_date,
			active: true
		})

		closeAccountModal()
	}

	const { errors } = formState

	useEffect(() => {
		if (editAccount !== null) {
			setAccountType(accountTypes.find(item => item.type === editAccount?.type)?.type)
			setActiveColor(editAccount?.color)
			setValue('name', editAccount?.name)
			setValue('balance', editAccount?.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }))
			setValue('invoice_closing_date', Number(editAccount?.invoice_closing_date))
			setValue('invoice_due_date', Number(editAccount?.invoice_due_date))
		} else {
			setAccountType(accountTypes[0].type)
			setActiveColor(colors ? colors[0] : null)
			setValue('name', '')
			setValue('balance', '')
			setValue('invoice_closing_date', '')
			setValue('invoice_due_date', '')
		}
	}, [isOpenAccountModal])

	return (
		<Modal
			isOpen={isOpenAccountModal}
			onClose={closeAccountModal}
			isCentered
			size="xl"
			scrollBehavior="inside"
		>
			<ToastContainer />

			<ModalOverlay />
			<ModalContent
				max-height={{ base: "calc(100% - 2rem)", lg: "calc(100% - 7.5rem" }}
				bg="gray.800"
				p="1.5rem"
				overflow="hidden"
				borderRadius="1rem"
				as="form"
				onSubmit={handleSubmit(handleSaveAccount)}
			>
				<ModalHeader p="0" mb="2rem">
					<HStack>
						<Icon as={editAccount ? RiEditLine : RiAddLine} fontSize="1.5rem" />
						<Text textTransform="uppercase">{editAccount ? "Editar conta" : "Adicionar conta"}</Text>
					</HStack>
				</ModalHeader>
				<ModalCloseButton
					top="1.5rem"
					right="1.5rem"
					fontSize="1rem"
					color="gray.100"
				/>

				<ModalBody p="0">
					<Stack spacing="1.5rem">
						<input type="hidden" name="credit_card" value={accountType === 'credit_card' ? 1 : 0} {...register('credit_card')} />

						<FormControl>
							<SelectAccountType
								name="type"
								label="Tipo de conta"
								types={accountTypes}
								accountType={accountType}
								setAccountType={setAccountType}
								disabled={editAccount === null ? false : true}
							/>
						</FormControl>

						<Input name="name" type="text" label="Nome" error={errors.name} {...register('name')} />

						{accountType === 'credit_card'
							? <>
								<Input
									name="invoice_due_date"
									type="number"
									label="Dia de vencimento da fatura"
									icon={RiCalendarLine}
									placeholder="DD"
									error={errors.invoice_due_date}
									{...register('invoice_due_date')}
								/>
								<Input
									name="invoice_closing_date"
									type="number"
									label="Dia de fechamento da fatura"
									icon={RiCalendarLine}
									placeholder="DD"
									error={errors.invoice_closing_date}
									{...register('invoice_closing_date')}
								/>
							</>
							: <Input
								name="balance"
								type="text"
								inputMode="numeric"
								label={editAccount ? "Saldo atual" : "Saldo inicial"}
								suffix="R$"
								placeholder="0,00"
								mask="currency"
								error={errors.balance}
								{...register('balance')}
							/>
						}

						<FormControl>
							<FormLabel
								htmlFor="color"
								textTransform="uppercase"
								fontSize="sm"
								ml="0.5rem"
								mb="0"
								color="gray.400"
							>Selecione uma cor:</FormLabel>
							<Flex wrap="wrap" css={{ gap: '0.5rem' }}>
								{colors?.map(color => (
									<SelectColorButton
										key={color.id}
										color={color.hex_code}
										onClick={() => setActiveColor(color)}
										active={activeColor?.id === color.id}
									/>
								))}
							</Flex>
						</FormControl>

						<Button type="submit" isLoading={formState.isSubmitting} colorScheme="green" w="100%">
							Salvar
						</Button>

						{editAccount !== null && editAccount?.active &&
							<Button type="button" onClick={() => deactivateAccount()} colorScheme="red" w="100%" mt="2rem">
								Desativar conta
							</Button>
						}
						{editAccount !== null && editAccount?.active === false &&
							<Button type="button" onClick={reactivate} colorScheme="orange" w="100%" mt="2rem">
								Reativar conta
							</Button>
						}
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}