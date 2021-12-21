import { Center, Flex, Stack, Img, Button, Tooltip } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { Input } from '../components/Form/Input';
import { NavLink } from '../components/NavLink'
import { useRouter } from 'next/dist/client/router'
import { api } from '../services/api'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'

type SignInFormData = {
	email: string;
	password: string;
}

const signInFormSchema = yup.object().shape({
	email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
	password: yup.string().required('Senha é obrigatória')
})

export default function Home() {
	const { user, signIn } = useUser()

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(signInFormSchema)
	})

	const router = useRouter()

	const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
		await api.post('login', values)
			.then((response) => {
				if (response.data.status) {
					signIn(response.data.token, response.data.user)
				}
			})
			.catch((error) => {
				toast.error("Usuário ou senha inválidos!")
			})
	}

	const { errors } = formState

	useEffect(() => {
		if (user) {
			router.push('/dashboard')
		}
	}, [user])

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
				<title>Login | FinançApp</title>
			</Head>


			<Stack
				w="100%"
				maxW="22rem"
				m="1.5rem"
				align="start"
				spacing="2rem"
			>
				<Img src="./logo.svg" alt="FinançApp" h="2.5rem" />
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
							<Input
								name="email"
								type="email"
								label="E-mail"
								error={errors.email}
								{...register('email')}
							/>

							<Input
								name="password"
								type="password"
								label="Senha"
								error={errors.password}
								{...register('password')}
							/>
						</Stack>

						<Stack spacing="1rem">
							<Button type="submit" colorScheme="green" isLoading={formState.isSubmitting}>Entrar</Button>

							{/*<HStack w="100%" h="1.5rem" spacing="1.5rem" align="center">
								<Box h="2px" w="100%" bg="gray.600" />
								<Text color="gray.400">ou</Text>
								<Box h="2px" w="100%" bg="gray.600" />
							</HStack>

							<Button type="button" bg="white">
								<HStack spacing="0.75rem" align="center">
									<Img src="./icons/google.svg" alt="Google" />
									<Text color="black">Entre com sua conta Google</Text>
								</HStack>
							</Button>

							<Button type="button" colorScheme="facebook">
								<HStack spacing="0.75rem" align="center">
									<Img src="./icons/facebook.svg" alt="Facebook" />
									<Text>Entre com sua conta Facebook</Text>
								</HStack>
							</Button>*/}

						</Stack>
					</Stack>
				</Flex>

				<Flex w="100%" justify="space-between">
					<Tooltip label="Funcionalidade ainda não implementada">
						<Flex cursor="not-allowed" opacity={0.5}>
							<NavLink href=''>Recuperar senha</NavLink>
						</Flex>
					</Tooltip>
					<NavLink href="/user/register">Novo cadastro</NavLink>
				</Flex>
			</Stack>
		</Center>
	)
}
