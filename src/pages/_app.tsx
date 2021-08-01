import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { MonthContextProvider } from '../contexts/MonthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <MonthContextProvider>
          <Component {...pageProps} />
        </MonthContextProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
