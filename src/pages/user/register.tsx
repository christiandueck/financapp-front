import { Center, Flex, Stack, Img, Text, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { Input } from '../../components/Form/Input';
import { useRouter } from 'next/dist/client/router'
import { api } from '../../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

type SignInFormData = {
	name: string;
	email: string;
	password: string;
}

interface CreateUserSuccess {
	status: boolean;
	user: {
		name: string;
		email: string;
	}
}

interface CreateUserError {
	status: boolean;
	user: string;
}

const registerUserFormSchema = yup.object().shape({
	name: yup.string().required('Nome é obrigatório'),
	email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
	email_confirmation: yup.string().oneOf([
		null, yup.ref('email')
	], 'Os e-mails precisam ser iguais'),
	password: yup.string().required('Senha obrigatória'),
	password_confirmation: yup.string().oneOf([
		null, yup.ref('password')
	], 'As senhas precisam ser iguais'),
})

export default function RegisterUser() {
	const [alreadyRegisteredEmails, setAlreadyRegisteredEmails] = useState<String[]>([])

	const { register, handleSubmit, formState, watch } = useForm({
		resolver: yupResolver(registerUserFormSchema)
	})

	const router = useRouter()

	const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
		await api.post('register', values)
			.then((response: AxiosResponse<CreateUserSuccess>) => {
				if (response.data.status) {
					router.push('/')
				}
				console.log(response)
			})
			.catch((error: AxiosError<CreateUserError>) => {
				toast.error(error.response?.data.user)
				setAlreadyRegisteredEmails([...alreadyRegisteredEmails, values.email])
			})
	}

	const { errors } = formState

	return (
		<Center
			position="fixed"
			top={0}
			bottom={0}
			left={0}
			right={0}
		>
			<ToastContainer />

			<Head>
				<title>Cadastro de Usuário | FinançApp</title>
			</Head>

			<Stack
				w="100%"
				maxW="22rem"
				m="1.5rem"
				align="start"
				spacing="2rem"
			>
				<Img src="../../logo.svg" alt="FinançApp" h="2.5rem" />
				<Flex
					as="form"
					w="100%"
					bg="gray.700"
					p="1.25rem"
					borderRadius="1rem"
					flexDir="column"
					onSubmit={handleSubmit(handleSignIn)}
				>
					<Stack spacing="1.5rem">
						<Stack spacing="1rem">
							<Text fontWeight="black" textTransform="uppercase">
								Novo Cadastro
							</Text>

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
							/>

							<Input
								name="email_confirmation"
								type="email"
								label="Confirmação de E-mail"
								error={errors.email_confirmation}
								{...register('email_confirmation')}
							/>

							<Input
								name="password"
								type="password"
								label="Senha"
								error={errors.password}
								{...register('password')}
							/>

							<Input
								name="password_confirmation"
								type="password"
								label="Confirmação de Senha"
								error={errors.password_confirmation}
								{...register('password_confirmation')}
							/>
						</Stack>

						<Button type="submit" colorScheme="green" isLoading={formState.isSubmitting}>Cadastrar</Button>

						<Button type="button" colorScheme="red" onClick={() => router.push("/")}>Cancelar</Button>
					</Stack>
				</Flex>
			</Stack>
		</Center>
	)
}
