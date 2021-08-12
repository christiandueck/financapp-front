import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { MonthContextProvider } from '../contexts/MonthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { CategoryContextProvider } from '../hooks/useCategory';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CategoryContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <MonthContextProvider>
            <Component {...pageProps} />
          </MonthContextProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </CategoryContextProvider>
  )
}

export default MyApp
