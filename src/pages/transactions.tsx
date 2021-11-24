import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import { Header } from '../components/Header'

export default function Transactions() {

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
        <title>Transações | FinançApp</title>
      </Head>


    </Stack>
  )
}