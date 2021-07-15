import { Center, FormControl, FormLabel, Icon, Button, Flex, HStack, Input as ChakraInput, IconButton } from '@chakra-ui/react'
import { Badge } from '../Badge'
import { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine, RiBankCard2Line, RiBankLine, RiFunctionLine, RiWalletLine } from 'react-icons/ri'
import { useEffect } from 'react'

interface SelectCategoryProps {
  name: string;
  label?: string;
  transaction: string;
}

type Category = {
  type: 'income' | 'outcome'
  id?: string;
  name: string;
  color: string;
}

export function SelectCategory({ name, label, transaction }: SelectCategoryProps) {

  const categories = [
    {
      type: 'outcome',
      id: '1',
      name: 'Água',
      color: '#1DB4F5'
    },
    {
      type: 'outcome',
      id: '2',
      name: 'Aluguel',
      color: '#F51D1D'
    },
    {
      type: 'outcome',
      id: '3',
      name: 'Transporte',
      color: '#20B74A'
    },
    {
      type: 'outcome',
      id: '4',
      name: 'Comunicação',
      color: '#961DF5'
    },
    {
      type: 'outcome',
      id: '5',
      name: 'Luz',
      color: '#F5781D'
    },
    {
      type: 'outcome',
      id: '6',
      name: 'Mercado',
      color: '#1DB4F5'
    },
    {
      type: 'outcome',
      id: '7',
      name: 'Lazer',
      color: '#C289EF'
    },
    {
      type: 'outcome',
      id: '8',
      name: 'Educação',
      color: '#FF4A96'
    },
    {
      type: 'income',
      id: '9',
      name: 'Salário',
      color: '#FA4F4F'
    },
    {
      type: 'income',
      id: '10',
      name: 'Rendimentos',
      color: '#F5781D'
    },
    {
      type: 'income',
      id: '11',
      name: 'Outros',
      color: '#9DB410'
    }
  ]

  const [category, setCategory] = useState(categories[0])
  const [showList, setShowList] = useState(false)

  function toggleShowList() {
    setShowList(!showList)
  }

  function changeCategory(category) {
    setCategory(category)
    setShowList(false)
  }

  useEffect(() => {
    setCategory(categories.filter((category) => (category.type === transaction))[0])
  }, [transaction])

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
                <Icon as={RiFunctionLine} fontSize="1.25rem" />
              </Center>

              <Badge name={category.name} color={category.color} id={category.id} />
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
              {categories.filter((category) => (category.type === transaction)).map((category) => {
                return (
                  <Badge
                    key={category.id}
                    name={category.name}
                    color={category.color}
                    onClick={() => changeCategory(category)}
                  />
                )
              })}
            </Flex>
          }
        </Flex>
      </Flex>

      <ChakraInput type="hidden" name={name} value={category.id} />
    </FormControl>
  )
}