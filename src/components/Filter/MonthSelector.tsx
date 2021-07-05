import { useMonth } from '../../contexts/MonthContext';
import { Center, Button, Icon, Text, Flex } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

export function MonthSelector() {
  const { description, previousMonth, nextMonth } = useMonth()

  return (
    <Center w="100%">
      <Flex color="gray.50" spacing="3rem" align="center" justify="space-between" w={{ base: "100%", md: "20rem" }} my="-0.5rem">
        <Button
          variant="unstyled"
          _hover={{ color: 'gray.400' }}
          onClick={previousMonth}
        >
          <Icon as={RiArrowLeftSLine} fontSize="2rem" />
        </Button>
        
        <Text
          textTransform="uppercase"
          fontSize={{ base: "1.1rem", lg: "1.25rem" }}
          fontWeight="bold"
          textAlign="center"
        >{description}</Text>
        
        <Button
          variant="unstyled"
          _hover={{ color: 'gray.400' }} 
          onClick={nextMonth}
        >
          <Icon as={RiArrowRightSLine} fontSize="2rem" />
        </Button>
      </Flex>
    </Center>
  )
}