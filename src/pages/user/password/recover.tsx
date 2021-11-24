import { Center, Flex, Stack, Img, Text, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { Input } from '../../../components/Form/Input';
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'

type recoverPasswordFormData = {
  email: string;
}

const recoverPasswordFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export default function RegisterUser() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(recoverPasswordFormSchema)
  })

  const router = useRouter()

  const [sent, setSent] = useState(false)

  const handleSignIn: SubmitHandler<recoverPasswordFormData> = async (values) => {
    setSent(false);
    await new Promise(resolve => setTimeout(resolve, 2000))

    setSent(true);
    console.log(values)
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
        <title>Recuperar senha | FinançApp</title>
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

              {sent && <Text>Verifique seu e-mail com as instruções para alteração da senha.</Text>}

              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />

            </Stack>

            <Button type="submit" colorScheme="green" isLoading={formState.isSubmitting}>
              {sent ? 'Enviar novamente' : 'Solicitar troca de senha'}
            </Button>

            <Button type="button" colorScheme="red" onClick={() => router.push("/")}>Voltar</Button>
          </Stack>
        </Flex>
      </Stack>
    </Center>
  )
}
