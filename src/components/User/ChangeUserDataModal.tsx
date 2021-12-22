import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import { Input } from "../Form/Input"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUser } from "../../hooks/useUser"
import { useState, useEffect } from "react"
import { api } from "../../services/api"

type ChangeUserDataFormData = {
	name: string;
	email: string;
	password: string;
}

const changeUserDataFormSchema = yup.object().shape({
	name: yup.string().required('O nome é obrigatório')
})

/*const changePasswordFormSchema = yup.object().shape({
	current_password: yup.string().required('Senha atual obrigatória'),
	new_password: yup.string().required('Nova senha obrigatória'),
	new_password_confirmation: yup.string().oneOf([
		null, yup.ref('new_password')
	], 'As novas senhas precisam ser iguais'),
})*/

interface ChangeUserDataModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ChangeUserDataModal({ isOpen, onClose }: ChangeUserDataModalProps) {
	const { user, getUser } = useUser();
	const [showPasswordForm, setShowPasswordForm] = useState(false)

	const { register, handleSubmit, formState, setValue } = useForm({
		resolver: yupResolver(changeUserDataFormSchema)
	})

	setValue('name', user?.name)
	setValue('email', user?.email)

	const handleChangeUserData: SubmitHandler<ChangeUserDataFormData> = async (values) => {
		await api.post(`/user/${user.id}/change-name`, {
			name: values.name,
		}).then(response => console.log(response)).catch(error => console.log(error.response))
		getUser();
		console.log(values.name)
		onClose
	}

	const { errors } = formState

	useEffect(() => {
		setShowPasswordForm(false)
	}, [isOpen])

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
			<ModalOverlay />
			<ModalContent bg="gray.800" p="1.5rem" overflow="hidden" borderRadius="1rem">

				<ModalHeader p="0" mb="2rem">
					<Text textTransform="uppercase">{showPasswordForm ? "Alterar senha" : "Alterar dados pessoais"}</Text>
				</ModalHeader>
				<ModalCloseButton
					top="1.5rem"
					right="1.5rem"
					fontSize="1rem"
					color="gray.100"
				/>

				{/*showPasswordForm
					? <>
						<ModalBody p="0" as="form" onSubmit={onClose}>
							<Stack spacing="1.5rem">

								<Input
									name="current_password"
									type="password"
									label="Senha atual"
									error={errors.current_password}
									{...register('current_password')}
								/>

								<Input
									name="new_password"
									type="password"
									label="Nova senha"
									error={errors.new_password}
									{...register('new_password')}
								/>

								<Input
									name="new_password_confirmation"
									type="password"
									label="Confirmação de nova senha"
									error={errors.new_password_confirmation}
									{...register('new_password_confirmation')}
								/>

							</Stack>
						</ModalBody>

						<ModalFooter p="0" mt="2.5rem">
							<Button type="submit" colorScheme="green" onClick={onClose} w="100%" isLoading={formState.isSubmitting}>
								Salvar nova senha
							</Button>
						</ModalFooter>
					</>
				: <> */}
				<ModalBody p="0" as="form" onSubmit={handleSubmit(handleChangeUserData)}>
					<Stack spacing="1.5rem">

						<Input
							name="name"
							type="text"
							label="Nome"
							error={errors.name}
							{...register('name')}
						/>

						<Input
							name="email"
							type="email"
							label="E-mail"
							error={errors.email}
							{...register('email')}
							isDisabled
						/>

					</Stack>
				</ModalBody>

				{/*<Button type="button" colorScheme="orange" onClick={() => setShowPasswordForm(true)} w="100%" mt="2rem">
							Alterar Senha
				</Button>*/}

				<ModalFooter p="0" mt="2.5rem">
					<Button type="submit" colorScheme="green" w="100%" isLoading={formState.isSubmitting}>
						Salvar
					</Button>
				</ModalFooter>
				{//</>
				}


			</ModalContent>
		</Modal>
	)
}