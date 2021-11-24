import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import { Input } from "../Form/Input"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUser } from "../../hooks/useUser"

type ChangeUserDataFormData = {
	name: string;
	email: string;
	password: string;
}

const changeUserDataFormSchema = yup.object().shape({
	email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
	password: yup.string().required('Senha é obrigatória')
})

interface ChangeUserDataModalProps {
	isOpen: boolean;
	onClose: () => void;
}


export function ChangeUserDataModal({ isOpen, onClose }: ChangeUserDataModalProps) {
	const { user } = useUser();

	const { register, handleSubmit, formState, setValue } = useForm({
		resolver: yupResolver(changeUserDataFormSchema)
	})

	setValue('name', user?.name)
	setValue('email', user?.email)

	const handleChangeUserData: SubmitHandler<ChangeUserDataFormData> = async (values) => {
		await new Promise(resolve => setTimeout(resolve, 2000))

		console.log(values)
		onClose
	}

	const { errors } = formState

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
			<ModalOverlay />
			<ModalContent bg="gray.800" p="1.5rem" overflow="hidden" borderRadius="1rem">

				<ModalHeader p="0" mb="2rem">
					<Text textTransform="uppercase">Alterar dados pessoais</Text>
				</ModalHeader>
				<ModalCloseButton
					top="1.5rem"
					right="1.5rem"
					fontSize="1rem"
					color="gray.100"
				/>

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

				<ModalFooter p="0" mt="2.5rem">
					<Button type="submit" colorScheme="green" onClick={onClose} w="100%" isLoading={formState.isSubmitting}>
						Salvar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}