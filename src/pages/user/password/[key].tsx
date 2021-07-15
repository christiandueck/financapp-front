import { Center, Flex, Stack, Img, Text, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { Input } from '../../../components/Form/Input';
import { useRouter } from 'next/dist/client/router'

type changePasswordFormData = {
  password: string;
}

const recoverPasswordFormSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function RegisterUser() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(recoverPasswordFormSchema)
  })

  const router = useRouter()

  const handleSignIn: SubmitHandler<changePasswordFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
    router.push('/')
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
      <Head>
        <title>Alterar Senha | FinançApp</title>
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
                Recuperar senha
              </Text>

              <Input
                name="password"
                type="password"
                label="Nova senha"
                error={errors.password}
                {...register('password')}
              />

              <Input
                name="password_confirmation"
                type="password"
                label="Repetir nova senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />

            </Stack>

            <Button type="submit" colorScheme="green" isLoading={formState.isSubmitting}>
              Alterar Senha
            </Button>

            <Button type="button" colorScheme="red" onClick={() => router.push("/")}>Cancelar</Button>
          </Stack>
        </Flex>
      </Stack>
    </Center>
  )
}
