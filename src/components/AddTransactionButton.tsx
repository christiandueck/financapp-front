import { Button, Stack, Icon, Text } from "@chakra-ui/react"
import { RiAddLine } from "react-icons/ri"

export function AddTransactionButton() {
  return (
    <Button type="button" size="lg" colorScheme="teal" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)">
      <Stack direction="row" spacing="0.5rem" color="black">
        <Icon as={RiAddLine} size="4" />
        <Text fontSize="md" lineHeight="1.25rem" fontWeight="black" textTransform="uppercase">Nova transação</Text>
      </Stack>
    </Button>
  )
}