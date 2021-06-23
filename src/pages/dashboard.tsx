import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import { Header } from '../components/Header'

export default function Dashboard() {
  return (
    <Stack
      spacing="3rem"
      align="center"
      my="2rem"
      mx="auto"
      px="1.5rem"
      w="100vw"
      maxW="85rem"
    >
      <Head>
        <title>Dashboard | FinançApp</title>
      </Head>

      <Header />
    </Stack>
  )
}