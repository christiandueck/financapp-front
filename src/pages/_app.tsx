import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { MonthContextProvider } from '../contexts/MonthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MonthContextProvider>
        <Component {...pageProps} />
      </MonthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
