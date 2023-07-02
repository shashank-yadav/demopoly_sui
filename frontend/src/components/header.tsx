import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI,
} from "@suiet/wallet-kit";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import {
  faTwitter,
  faDiscord,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  m_HeaderBgColor,
  m_NormalTextColor,
  m_SectionHeadingColor,
} from "../Constants";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"gray.200"}
        color={"gray.200"}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex
          flex={{ base: '0.2', md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} color={"gray.700"}/> : <HamburgerIcon w={5} h={5} color={"gray.700"}/>
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 0.8, sm: 1 }} justify={{ base: 'center', md: 'start' }} pb={1}>
          <Flex flex={{ base: 1, sm: 0.5 }} direction={{ base: "row", sm: "row"}} alignItems={"center"} px={5}>
           <Avatar size="md" name="Dece Rate" src="demopoly-logo.png" />
             <Text
              pt={0}
              px={5}
              fontSize={{ base: "3xl", sm: "3xl", md: "3xl" }}
              fontWeight="normal"
              fontFamily={"KoolBeans-eerm"}
              textColor={"gray.700"}
            >
              Demopoly
              <Badge ml="2" colorScheme="green">
                beta
              </Badge>
            </Text>
           </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} flex={{base: 1, sm: 0.3}} ml={10} alignItems={"center"}>
          </Flex>
          <Flex display={{ base: 'none', md: 'flex' }} flex={{base: 1, sm: 0.2}} ml={10} alignItems={"center"}>
          <ConnectButton
            onConnectError={(error) => {
              if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                console.warn(
                  "user rejected the connection to " + error.details?.wallet
                );
              } else {
                console.warn("unknown connect error: ", error);
              }
            }}
          >Connect Wallet</ConnectButton>
        </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}