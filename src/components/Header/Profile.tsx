import { Avatar, AvatarProps } from "@chakra-ui/avatar"

export function Profile({ ...rest }: AvatarProps) {
  return (
    <Avatar
      size="lg"
      bg="gray.600"
      border="4px solid rgba(255, 255, 255, 0.6)"
      filter="drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))"
      {...rest}
    />
  )
}