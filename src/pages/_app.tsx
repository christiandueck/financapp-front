import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import '../styles/scroolbar.css';
import { MonthContextProvider } from '../contexts/MonthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserProvider } from '../hooks/useUser';
import { CategoryProvider } from '../hooks/useCategory';
import { ColorProvider } from '../hooks/useColor';
import { AccountProvider } from '../hooks/useAccount';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ColorProvider>
				<AccountProvider>
					<CategoryProvider>
						<QueryClientProvider client={queryClient}>
							<ChakraProvider theme={theme}>
								<MonthContextProvider>
									<Component {...pageProps} />
								</MonthContextProvider>
							</ChakraProvider>
						</QueryClientProvider>
					</CategoryProvider>
				</AccountProvider>
			</ColorProvider>
		</UserProvider>
	)
}

export default MyApp
