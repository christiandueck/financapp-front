import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import '../styles/scroolbar.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserProvider } from '../hooks/useUser';
import { CategoryProvider } from '../hooks/useCategory';
import { ColorProvider } from '../hooks/useColor';
import { AccountProvider } from '../hooks/useAccount';
import { TransactionProvider } from '../hooks/useTransaction';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ColorProvider>
				<AccountProvider>
					<CategoryProvider>
						<TransactionProvider>
							<QueryClientProvider client={queryClient}>
								<ChakraProvider theme={theme}>
									<Component {...pageProps} />
								</ChakraProvider>
							</QueryClientProvider>
						</TransactionProvider>
					</CategoryProvider>
				</AccountProvider>
			</ColorProvider>
		</UserProvider>
	)
}

export default MyApp
