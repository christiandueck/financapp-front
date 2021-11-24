import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { MonthContextProvider } from '../contexts/MonthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-toastify/dist/ReactToastify.min.css';
import { UserProvider } from '../hooks/useUser';
import { CategoryProvider } from '../hooks/useCategory';
import { ColorProvider } from '../hooks/useColor';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ColorProvider>
        <CategoryProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <MonthContextProvider>
                <Component {...pageProps} />
              </MonthContextProvider>
            </ChakraProvider>

            <ReactQueryDevtools />
          </QueryClientProvider>
        </CategoryProvider>
      </ColorProvider>
    </UserProvider>
  )
}

export default MyApp
