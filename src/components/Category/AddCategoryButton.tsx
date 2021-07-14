import { Button, Stack, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { RiAddLine } from "react-icons/ri"
import { AddCategoryModal } from "./AddCategoryModal"

interface AddCategoryButtonProps {
  type: 'income' | 'outcome'
}

export function AddCategoryButton({ type = 'income' }: AddCategoryButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        type="button"
        colorScheme="green"
        boxShadow="0px 3px 6px rgba(0, 0, 0, 0.5)"
        w={["100%", "auto"]}
        onClick={onOpen}
      >
        <Stack
          direction="row"
          spacing="0.5rem"
          align="center"
        >
          <Icon as={RiAddLine} />
          <Text
            lineHeight="1.25rem"
            fontWeight="black"
            textTransform="uppercase"
          >Adicionar categoria</Text>
        </Stack>
      </Button>

      <AddCategoryModal isOpen={isOpen} onClose={onClose} type={type} />
    </>
  )
}