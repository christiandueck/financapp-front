import { Button, Stack, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { RiAddLine } from "react-icons/ri"
import { AddTransactionModal } from "./AddTransactionModal"

export function AddTransactionButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        type="button"
        colorScheme="teal"
        boxShadow="0px 3px 6px rgba(0, 0, 0, 0.5)"
        w={["100%", "auto"]}

        onClick={onOpen}
      >
        <Stack
          direction="row"
          spacing="0.5rem"
          color="black"
          align="center"
        >
          <Icon as={RiAddLine} />
          <Text
            lineHeight="1.25rem"
            fontWeight="black"
            textTransform="uppercase"
          >Nova transação</Text>
        </Stack>
      </Button>

      <AddTransactionModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}