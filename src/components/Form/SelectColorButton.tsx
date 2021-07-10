import { Center, Circle } from "@chakra-ui/react"

interface SelectColorButtonProps {
  color: string;
  active?: boolean;
  onClick?: () => void;
}

export function SelectColorButton({ color, active, onClick }: SelectColorButtonProps) {
  return (
    <Circle size="3rem" border={active ? '3px solid #969B9B' : 'none'} onClick={onClick} cursor="pointer">
      <Center>
        <Circle size="2rem" bg={color} />
      </Center>
    </Circle>
  )
}