import Head from 'next/head'
import { Stack, SimpleGrid, Flex, Text, Icon, Table, Thead, Tbody, Tr, Th, Td, Circle, useBreakpointValue, Button } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { AddCategoryButton } from '../components/Category/AddCategoryButton'
import { SelectButton } from '../components/Form/SelectButton'
import { RiArrowDownCircleFill, RiArrowUpCircleFill, RiToggleFill, RiToggleLine, RiEditLine, RiDeleteBin2Line } from 'react-icons/ri'
import { useState } from 'react'
import { CategoryTable } from '../components/Category/CategoryTable'

type Category = 'income' | 'outcome'

const categories = [
  {
    type: 'outcome',
    id: '1',
    name: 'Água',
    color: '#1DB4F5',
    active: true,
  },
  {
    type: 'outcome',
    id: '2',
    name: 'Aluguel',
    color: '#F51D1D',
    active: true,
  },
  {
    type: 'outcome',
    id: '3',
    name: 'Transporte',
    color: '#20B74A',
    active: true
  },
  {
    type: 'outcome',
    id: '4',
    name: 'Comunicação',
    color: '#961DF5',
    active: true,
  },
  {
    type: 'outcome',
    id: '5',
    name: 'Luz',
    color: '#F5781D',
    active: true
  },
  {
    type: 'outcome',
    id: '6',
    name: 'Mercado',
    color: '#1DB4F5',
    active: true
  },
  {
    type: 'outcome',
    id: '7',
    name: 'Lazer',
    color: '#C289EF',
    active: true
  },
  {
    type: 'outcome',
    id: '8',
    name: 'Educação',
    color: '#FF4A96',
    active: true
  },
  {
    type: 'income',
    id: '9',
    name: 'Salário',
    color: '#FA4F4F',
    active: true
  },
  {
    type: 'income',
    id: '10',
    name: 'Rendimentos',
    color: '#F5781D',
    active: true
  },
  {
    type: 'income',
    id: '11',
    name: 'Outros',
    color: '#9DB410',
    active: true
  },
  {
    type: 'income',
    id: '12',
    name: 'Vendas Mercado Livre',
    color: '#1DB4F5',
    active: false
  },
  {
    type: 'outcome',
    id: '13',
    name: 'Parcelas Empréstimo',
    color: '#9DB410',
    active: false
  },
  {
    type: 'outcome',
    id: '14',
    name: 'Despesas Festa',
    color: '#FA4F4F',
    active: false
  }
]

export default function Categories() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const [categoryType, setCategoryType] = useState<Category>('income')
  const [activeCategories, setActiveCategories] = useState(true)

  function toggleActiveCategories() {
    setActiveCategories(!activeCategories)
  }

  return (
    <>
      <Stack
        spacing={{ base: "1.5rem", lg: "3rem" }}
        align="center"
        my={{ base: "1rem", lg: "2rem" }}
        mx="auto"
        px={{ base: "1rem", lg: "1.5rem" }}
        pb={{ base: "3.5rem", md: 0 }}
        w="100vw"
        minH="95vh"
        maxW="85rem"
        position="relative"
      >
        <Header />

        <Head>
          <title>Categorias | FinançApp</title>
        </Head>

        <Flex w="100%">
          <Stack spacing="3rem" direction={{ base: "column", md: "row" }} w={{ base: "100%", md: "auto" }}>
            {!isMobile && <AddCategoryButton type={categoryType} />}

            <Stack spacing={{ base: "1rem", md: "2rem" }} direction={{ base: "column", md: "row" }} w={{ base: "100%", md: "auto" }}>
              <SimpleGrid spacing="1rem" columns={2} w={{ base: "100%", md: "auto" }}>
                <SelectButton
                  icon={{
                    icon: RiArrowUpCircleFill,
                    color: "green.500"
                  }}
                  active={categoryType === 'income'}
                  onClick={() => setCategoryType('income')}
                >Entrada</SelectButton>

                <SelectButton
                  icon={{
                    icon: RiArrowDownCircleFill,
                    color: "red.500"
                  }}
                  active={categoryType === 'outcome'}
                  onClick={() => setCategoryType('outcome')}
                >Saída</SelectButton>
              </SimpleGrid>

              <Flex
                h="2.75rem"
                align="center"
                justify="center"
                pl="1rem"
                pr="0.75rem"
                boxShadow="inset 0px 0px 0px 3px #565E5E"
                borderRadius="0.5rem"
                cursor="pointer"
                onClick={toggleActiveCategories}
                position="relative"
              >
                <Stack spacing="0.5rem" direction="row" align="center">
                  <Text textTransform="uppercase" fontWeight="bold" fontSize="1rem">{activeCategories ? "Categorias Ativas" : "Categorias Inativas"}</Text>
                  <Icon as={activeCategories ? RiToggleFill : RiToggleLine} fontSize="1.5rem" />
                </Stack>
              </Flex>
            </Stack>
          </Stack>
        </Flex>

        <CategoryTable categories={categories.filter((category) => (
          category.type === categoryType
          && category.active === activeCategories
        ))
        } isMobile={isMobile} />
      </Stack>

      {isMobile &&
        <Flex w="100%" position="fixed" bottom={0} px="1rem" pb="1rem" pt="2rem" flexDir="row-reverse" background="linear-gradient(180deg, rgba(46, 56, 56, 0) 0%, rgba(46, 56, 56, 0.95) 35%);">
          <AddCategoryButton type={categoryType} />
        </Flex>
      }
    </>
  )
}