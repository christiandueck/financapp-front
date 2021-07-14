import { Stack, Flex, Text, Icon, Table, Thead, Tbody, Tr, Th, Td, Circle, Button } from '@chakra-ui/react'
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri'

interface CategoryTableProps {
  isMobile: boolean;
  categories: {
    id: string;
    type: 'income' | 'outcome' | string;
    name: string;
    color: string;
  }[]
}

export function CategoryTable({ isMobile, categories }: CategoryTableProps) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th
            fontWeight="bold"
            fontSize="1rem"
            color="white"
            borderBottom="2px"
            borderColor="#20B74A"
            px={{ base: "0.5rem", md: "1rem", lg: "2rem" }}
            py="0.5rem"
          >Nome</Th>
          {!isMobile && <Th
            fontWeight="bold"
            fontSize="1rem"
            color="white"
            borderBottom="2px"
            borderColor="#20B74A"
            py="0.5rem"
          >Cor</Th>}
          <Th
            fontWeight="bold"
            fontSize="1rem"
            color="white"
            w="4rem"
            borderBottom="2px"
            borderColor="#20B74A"
            px={{ base: "1rem", md: "1.5rem", lg: "2.5rem" }}
            py="0.5rem"
            textAlign="right"
          >Ações</Th>
        </Tr>
      </Thead>

      <Tbody>
        {categories.map(category => (
          <Tr key={category.id}>
            <Td px={{ base: "0.5rem", md: "1rem", lg: "2rem" }} borderColor="whiteAlpha.200">
              {isMobile
                ? <Stack spacing="0.5rem" direction="row" align="center">
                  <Circle h="1.5rem" w="1.5rem" bg={category.color} />
                  <Text>{category.name}</Text>
                </Stack>
                : <Text>{category.name}</Text>
              }
            </Td>

            {!isMobile && <Td borderColor="whiteAlpha.200"><Circle h="1.5rem" w="1.5rem" bg={category.color} /></Td>}

            <Td w="4rem" borderColor="whiteAlpha.200" h="3rem" py={0} px={{ base: "0.5rem", md: "1rem", lg: "2rem" }}>
              <Flex>
                <Button variant="unstyled">
                  <Icon as={RiEditLine} w="1.5rem" h="1.5rem" />
                </Button>

                <Button variant="unstyled">
                  <Icon as={RiDeleteBin2Line} w="1.5rem" h="1.5rem" />
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}