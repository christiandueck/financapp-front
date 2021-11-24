import { Center, FormControl, FormLabel, Icon, Button, Flex, HStack, Input as ChakraInput, IconButton, Text } from '@chakra-ui/react'
import { Badge } from '../Badge'
import { useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowUpSLine, RiBankCard2Line, RiBankLine, RiWalletLine } from 'react-icons/ri'

interface SelectAccountProps {
  name: string;
  label?: string;
}

type Account = {
  type: 'bank' | 'credit' | 'cash'
  id?: string;
  name: string;
  color: string;
}

export function SelectAccount({ name, label }: SelectAccountProps) {

  const accounts = [
    {
      type: 'bank',
      id: '1',
      name: 'Itaú',
      color: '#4267B2'
    },
    {
      type: 'credit',
      id: '2',
      name: 'Itaucad',
      color: '#F5781D'
    },
    {
      type: 'bank',
      id: '3',
      name: 'Caixa',
      color: '#1DB4F5'
    },
    {
      type: 'bank',
      id: '4',
      name: 'Banco do Brasil',
      color: '#9DB410'
    },
    {
      type: 'cash',
      id: '5',
      name: 'Carteira',
      color: '#20B74A'
    }
  ]

  const accountType = ['bank', 'credit', 'cash']
  const icons = [RiBankLine, RiBankCard2Line, RiWalletLine]

  const [account, setAccount] = useState(accounts[0])
  const [showList, setShowList] = useState(false)
  const [isCredit, setIsCredit] = useState(account.type === 'credit')

  function toggleShowList() {
    setShowList(!showList)
  }

  function changeAccount(account) {
    setAccount(account)
    setShowList(false)
  }

  useEffect(() => {
    setIsCredit(account.type === 'credit')
  }, [account.type])

  return (
    <FormControl id={name}>
      {!!label && <FormLabel
        htmlFor={name}
        textTransform="uppercase"
        fontSize="sm"
        ml="0.5rem"
        mb="0"
        color="gray.400"
      >
        {label}:
      </FormLabel>}
      <Flex
        h="inherit"
        w="100%"
        variant="unstyled"
        bg="gray.600"
        borderRadius="0.5rem"
        overflow="hidden"
        boxShadow={showList ? "0 0 0 2px var(--chakra-colors-green-500)" : "none"}
      >
        <Flex flexDir="column" w="100%">
          <Flex h="2.5rem" align="center" justifyContent="space-between" onClick={toggleShowList} cursor="pointer">
            <HStack align="center" spacing="1.5rem">
              <Center
                h="2rem"
                w="4rem"
                borderRight="1px solid"
                borderColor="whiteAlpha.200"
                color="gray.100"
              >
                <Icon as={RiBankLine} fontSize="1.25rem" />
              </Center>

              <Badge name={account.name} color={account.color} id={account.id} icon={icons[accountType.indexOf(account.type)]} />
            </HStack>

            <Icon
              mr="0.5rem"
              as={showList ? RiArrowUpSLine : RiArrowDownSLine}
              fontSize="2rem"
              color="gray.400"
            />
          </Flex>

          {showList &&
            <Flex p="1rem" wrap="wrap" css={{ gap: "1rem" }} borderTop="1px solid" borderColor="whiteAlpha.200">
              {accounts.map((account) => {
                return (
                  <Badge
                    key={account.id}
                    name={account.name}
                    color={account.color}
                    icon={icons[accountType.indexOf(account.type)]}
                    onClick={() => changeAccount(account)}
                  />
                )
              })}
            </Flex>
          }

          {isCredit &&
            <Flex borderTop="1px solid" borderColor="whiteAlpha.200" align="center">
              <Flex flex={1} h="2.5rem" borderRight="1px solid" borderColor="whiteAlpha.200" justify="space-between">
                <Button
                  variant="unstyled"
                  color="gray.400"
                  _hover={{ color: 'gray.100' }}
                >
                  <Icon as={RiArrowLeftSLine} fontSize="2rem" />
                </Button>

                <Button color="gray.200" variant="unstyled" _hover={{ color: 'white' }}>
                  <HStack>
                    <Text fontSize="0.8rem" fontWeight="normal">Fatura: </Text>
                    <Text>11/jul</Text>
                  </HStack>
                </Button>

                <Button
                  variant="unstyled"
                  color="gray.400"
                  _hover={{ color: 'gray.100' }}
                >
                  <Icon as={RiArrowRightSLine} fontSize="2rem" />
                </Button>
              </Flex>

              <Flex flex={1} h="2.5rem" justify="space-between">
                <Button
                  variant="unstyled"
                  color="gray.400"
                  _hover={{ color: 'gray.100' }}
                >
                  <Icon as={RiArrowLeftSLine} fontSize="2rem" />
                </Button>

                <Button color="gray.200" variant="unstyled" _hover={{ color: 'white' }}>
                  <HStack>
                    <Text>2x</Text>
                    <Text fontSize="0.8rem" fontWeight="normal">100,00</Text>
                  </HStack>
                </Button>

                <Button
                  variant="unstyled"
                  color="gray.400"
                  _hover={{ color: 'gray.100' }}
                >
                  <Icon as={RiArrowRightSLine} fontSize="2rem" />
                </Button>
              </Flex>
            </Flex>
          }
        </Flex>
      </Flex>

      <ChakraInput type="hidden" name={name} value={account.id} />
    </FormControl>
  )
}