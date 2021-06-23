import {
  Flex, Img, Stack, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, IconButton, Icon
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { NavBar } from './NavBar';
import { Profile } from './Profile'


export function Header() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  const { onOpen, isOpen, onClose } = useDisclosure()

  const router = useRouter()

  useEffect(() => {
    onClose()
  }, [router.asPath])

  return (
    <Flex
      as="header"
      w="100%"
      h="4rem"
      align="center"
      justify="space-between"
    >
      {isDrawerSidebar &&
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent bg="gray.800" pt="1rem" px="0.25rem">
              <DrawerCloseButton left="1rem" top="1.7rem" size="lg" />
              <DrawerHeader alignSelf="center">MENU</DrawerHeader>

              <DrawerBody>
                <NavBar />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      }
      {isMobile && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="3xl"
          variant="none"
          onClick={onOpen}
        />
      )}
      <Img src="./logo.svg" alt="FinançApp" h={{ base: "2rem", md: "2.5rem" }} />
      <Stack spacing="2rem" align="center" direction="row">
        <Stack spacing="2rem" align="center" direction="row" h="2.5rem">
          {!isMobile && <NavBar />}

          <Profile user={{
            name: "Christian Dueck",
            profileImage: "https://github.com/christiandueck.png"
          }} />
        </Stack>
      </Stack>
    </Flex>
  );
}