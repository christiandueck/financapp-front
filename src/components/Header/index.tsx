import { Flex, Img, Stack, Avatar } from '@chakra-ui/react'
import { AddTransactionButton } from '../AddTransactionButton'
import { Link } from '../Link'
import { Profile } from './Profile'


export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      h="4rem"
      align="center"
    >
      <Img src="./logo.svg" alt="FinançApp" h="3rem" />
      <Stack spacing="2rem" align="center" direction="row" ml="auto">
        <Stack spacing="2rem" align="center" direction="row" w="100%">
          <Link active>Dashboard</Link>
          <Link>Contas</Link>
          <Link>Categorias</Link>
          <Link>Transações</Link>

          <AddTransactionButton />

          <Profile name="Christian Dueck" src="https://github.com/christiandueck.png" />
        </Stack>
      </Stack>
    </Flex>
  );
}