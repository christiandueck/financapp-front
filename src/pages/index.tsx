import { Center, Flex, Stack, HStack, Img, Text, Button, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { Input } from '../components/Form/Input';
import { Link } from '../components/Link'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Home() {
  return (
    <Center
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
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
        >
          <Stack spacing="1.5rem">
            <Stack spacing="1rem">
              <Input name="email" type="email" label="E-mail" />
              <Input name="password" type="password" label="Senha" />
            </Stack>

            <Stack spacing="1rem">
              <Button type="submit" colorScheme="green">Entrar</Button>

              <HStack w="100%" h="1.5rem" spacing="1.5rem" align="center">
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
              </Button>

            </Stack>
          </Stack>
        </Flex>

        <Flex w="100%" justify="space-between">
          <Link>Recuperar senha</Link>
          <Link>Novo cadastro</Link>
        </Flex>
      </Stack>
    </Center>
  )
}
