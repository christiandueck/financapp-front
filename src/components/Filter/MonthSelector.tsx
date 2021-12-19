import { Center, Button, Icon, Text, Flex } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { useTransaction } from '../../hooks/useTransaction';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function MonthSelector() {
  const { period, setPeriod } = useTransaction()

  function changeMonth(aggregator: 1 | -1) {
    if (aggregator > 0) {
      if (period.month === 12) {
        setPeriod({ year: period.year + 1, month: 1 })
      } else {
        setPeriod({ ...period, month: period.month + 1 })
      }
    } else {
      if (period.month === 1) {
        setPeriod({ year: period.year - 1, month: 12 })
      } else {
        setPeriod({ ...period, month: period.month - 1 })
      }
    }
  }


  return (
    <Center w="100%">
      <Flex color="gray.50" spacing="3rem" align="center" justify="space-between" w={{ base: "100%", md: "20rem" }} my="-0.5rem">
        <Button
          variant="unstyled"
          _hover={{ color: 'gray.400' }}
          onClick={() => changeMonth(-1)}
        >
          <Icon as={RiArrowLeftSLine} fontSize="2rem" />
        </Button>

        <Text
          textTransform="uppercase"
          fontSize={{ base: "1.1rem", lg: "1.25rem" }}
          fontWeight="bold"
          textAlign="center"
        >
          {format(new Date(period.year, period.month - 1), 'MMMM yyyy', { locale: ptBR })}
        </Text>

        <Button
          variant="unstyled"
          _hover={{ color: 'gray.400' }}
          onClick={() => changeMonth(1)}
        >
          <Icon as={RiArrowRightSLine} fontSize="2rem" />
        </Button>
      </Flex>
    </Center>
  )
}