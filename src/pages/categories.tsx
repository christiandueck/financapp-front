import Head from 'next/head'
import { Stack, SimpleGrid, Flex, Text, Icon, useBreakpointValue, Spinner } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { AddCategoryButton } from '../components/Category/AddCategoryButton'
import { SelectButton } from '../components/Form/SelectButton'
import { RiArrowDownCircleFill, RiArrowUpCircleFill, RiToggleFill, RiToggleLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { CategoryTable } from '../components/Category/CategoryTable'
import { useCategory } from '../hooks/useCategory'

type CategoryType = 'income' | 'outcome'

export default function Categories() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const { listCategories, categoriesList, isLoading } = useCategory()
  const [categoryType, setCategoryType] = useState<CategoryType>('income')
  const [activeCategories, setActiveCategories] = useState(true)

  function toggleActiveCategories() {
    setActiveCategories(!activeCategories)
  }

  const error = false;

  useEffect(() => {
    listCategories()
  }, [])

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

        {isLoading ? (
          <Flex jusify="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex justify="center">
            <Text>
              Não foi possível carregar as categorias.
            </Text>
          </Flex>
        ) : (
          <CategoryTable data={categoriesList} categoryType={categoryType} activeCategories={activeCategories} isMobile={isMobile} />
        )}
      </Stack>

      {isMobile &&
        <Flex w="100%" position="fixed" bottom={0} px="1rem" pb="1rem" pt="2rem" flexDir="row-reverse" background="linear-gradient(180deg, rgba(46, 56, 56, 0) 0%, rgba(46, 56, 56, 0.95) 35%);">
          <AddCategoryButton type={categoryType} />
        </Flex>
      }
    </>
  )
}