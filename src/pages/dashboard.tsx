import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import { Header } from '../components/Header'

export default function Dashboard() {
  return (
    <Stack
      spacing="3rem"
      mx="auto"
      my="2rem"
      w="100%"
      px="1.5rem"
      maxW={1360}
    >
      <Head>
        <title>Dashboard | FinançApp</title>
      </Head>

      <Header />
    </Stack>
  )
}