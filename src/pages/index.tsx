import { Flex, Stack, HStack, Img, Text, Button, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { Link } from '../components/Link'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Home() {
  const { height } = useWindowDimensions();

  return (
    <Flex
      w="100vw"
      h={`${height}px`}
      align="center"
      justify="center"
    >
      <Head>
        <title>Login | FinançApp</title>
      </Head>


      <Stack
        w="100%"
        maxW={400}
        m="1.5rem"
        align="start"
        spacing="1.5rem"
      >
        <Img src="./logo.svg" alt="FinançApp" h="3rem" />
        <Flex
          as="form"
          w="100%"
          bg="gray.700"
          p="1.25rem"
          borderRadius="1rem"
          flexDir="column"
        >
          <Stack spacing="2rem">
            <Stack spacing="1rem">

            </Stack>

            <Stack spacing="1rem">
              <Button type="submit" colorScheme="green" size="lg">Entrar</Button>

              <HStack w="100%" h="1.5rem" spacing="1.5rem" align="center">
                <Box h="2px" w="100%" bg="gray.600" />
                <Text color="gray.400">ou</Text>
                <Box h="2px" w="100%" bg="gray.600" />
              </HStack>

              <Button type="button" size="lg" bg="white">
                <HStack spacing="0.75rem" align="center">
                  <Img src="./icons/google.svg" alt="Google" />
                  <Text color="black">Entre com sua conta Google</Text>
                </HStack>
              </Button>

              <Button type="button" colorScheme="facebook" size="lg">
                <HStack spacing="0.75rem" align="center">
                  <Img src="./icons/facebook.svg" alt="Facebook" />
                  <Text>Entre com sua conta Facebook</Text>
                </HStack>
              </Button>

            </Stack>
          </Stack>
        </Flex>

        <Flex w="100%" justify="space-between" px="1rem">
          <Link>Recuperar senha</Link>
          <Link>Novo cadastro</Link>
        </Flex>
      </Stack>
    </Flex>
  )
}
