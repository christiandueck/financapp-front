import { Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

interface SummaryCardProps {
  bg: string;
  icon: ElementType;
  label: string;
  amount: number;
  coloredAmount?: boolean;
}

export function SummaryCard({ bg, icon, label, amount, coloredAmount }: SummaryCardProps) {
  const formattedAmount = amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <Flex
          pt={{ base: "0.5rem", lg: "1.8rem" }}
          pb={{ base: "1rem", lg: "2rem" }}
          px={{ base: "1rem", lg: "1.8rem" }}
          bg={bg}
          borderRadius="0.5rem"
          flexDir="row-reverse"
          position="relative"
          overflow="hidden"
        >
          <Icon
            as={icon}
            position="absolute"
            w="140%"
            h="140%"
            top="-20%"
            right={{ base: "23%", lg: "20%" }}
            transform="rotate(20deg)"
            opacity={0.2}
          />
          <Stack spacing={{ base: 0, lg: "0.5rem" }} align="flex-end">
            <Text textTransform="uppercase" fontWeight="bold" fontSize={{ base: "1rem", lg: "1.5rem" }}>{label}</Text>
            <Text
              lineHeight={{ base: "1.5rem", lg: "2.5rem" }}
              fontSize={{ base: "1.8rem", lg: "2.5rem" }}
              fontWeight="bold"
              opacity={ coloredAmount ? 1 : 0.7 }
              color={ coloredAmount ? amount >= 0 ? "green.500" : "red.500" : "white" }
            >{formattedAmount}</Text>
          </Stack>
        </Flex>
  )
}