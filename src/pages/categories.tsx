import Head from 'next/head'
import { Stack, Flex } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { AddCategoryButton } from '../components/AddCategory/AddCategoryButton'

export default function Categories() {

  return (
    <Stack
      spacing={{ base: "1.5rem", lg: "3rem" }}
      align="center"
      my={{ base: "1rem", lg: "2rem" }}
      mx="auto"
      px={{ base: "1rem", lg: "1.5rem" }}
      w="100vw"
      maxW="85rem"
    >
      <Header />

      <Head>
        <title>Categorias | FinançApp</title>
      </Head>

      <Flex w="100%">
        <AddCategoryButton />
      </Flex>

    </Stack>
  )
}