import {
    chakra,
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Center,
    Button,
    Icon,
    IconProps,
    Box,
    SimpleGrid,
    Image,
    Card,
    CardHeader,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue
  } from '@chakra-ui/react';

import { ReactNode, ReactElement } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
  }

  const highlights = [
    {
      title: "Blind Voting",
      text: "Votes are not revealed until the polling ends. This ensures that the voters are not influenced by the current polling trends.",
      img: "elections_02.png",
    },
    {
      title: "Verifiably Secure",
      text: "All the votes are encrypted on-chain but can be verified after the reveal phase",
      img: "elections_03.png",
    },
    {
      title: "Easy Integration",
      text: "Handles all types of polls with custom tokens, nonlinear voting power and much more",
      img: "elections_09.png",
    },
  ];
  
const Feature = ({ title, text, icon }: FeatureProps) => {
    
    return (
        <Stack>
        <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            color={'gray.700'}
            lineHeight={'110%'}>
            {title}
          </Heading>
        <Text color={'gray.500'} fontSize={{ base: '1xl', sm: '2xl', md: '2xl' }}>{text}</Text>
        </Stack>
    );
};

interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
}  

const FeatureCard = ({ heading, description, icon, href }: CardProps) => {
    return (
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}>
        <Stack align={'start'} spacing={2}>
          {/* <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}>
            {icon}
          </Flex> */}
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {description}
            </Text>
          </Box>
          {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button> */}
        </Stack>
      </Box>
    );
  };
  
  export default function About() {
    return (
      <Container maxW={'5xl'} p={2}>
      <Stack
        textAlign={"left"}
        align={"left"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 7 }}
      >
        <Stack direction={"column"}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={"gray.700"}
            textAlign={"left"}
          >
            Blind Polls for
          </Heading>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={"blue.500"}
            textAlign={"left"}
          >
            DAO Governance
          </Heading>
        </Stack>
        <Box pt={{ base: 5, sm: 10 }}>
          <Stack direction={{ base: "column-reverse", sm: "row" }}>
            <Center width={{ base: "100%", sm: "50%" }}>
              <Feature
                icon={<Icon as={FcAssistant} w={10} h={10} />}
                title={"Blind and Secure On Chain Consensus Protocol"}
                text={
                  "Demopoly is the first on chain consensus protocol that supports blind polls and is verifiably secure. It can be integrated easily into the existing governance workflows of web3 projects."
                }
              />
            </Center>
            <Center width={{ base: "100%", sm: "50%" }}>
              <Image
                src="elections_01.png"
                alt="Elections"
                filter="auto"
                saturate="60%"
                width={"400px"}
                pb={10}
              />
            </Center>
            {/* <Box width={"50%"} bgColor={'green'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
            <Image src='elections_01.png' alt='Elections' filter='auto' saturate='60%' width={'400px'}/>
          </Box> */}
          </Stack>
        </Box>
        <Box
          pt={{ base: 10, sm: 20 }}
          alignItems={{ base: "left", sm: "center" }}
          textAlign={{ base: "left", sm: "center" }}
        >
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Our Whitelabel Solution for DAOs"}
            text={
              "Custom decentralized voting platform to make on-chain voting easy, fast and secure."
            }
          />
        </Box>
        <Box p={5}>
          <SimpleGrid columns={1} spacing={10} pt={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              justifyContent={"center"}
            >
              {highlights.map((highlight) => (
                <Card width={{ base: "100%", sm: "30%" }} p={2}>
                  <CardHeader>
                    <Heading size="md"> {highlight.title} </Heading>
                  </CardHeader>
                  <CardBody>
                    <Box
                      overflow="hidden"
                      justifyContent="center"
                      display={"flex"}
                      alignItems="center"
                    >
                      <Image
                        src={highlight.img}
                        alt="Elections"
                        filter="auto"
                        saturate="60%"
                        width={"200px"}
                      />
                    </Box>
                    <Text>{highlight.text}</Text>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          </SimpleGrid>
        </Box>
      </Stack>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
        //   py={{ base: 20, md: 28 }}>
          py={{ base: 5, md: 7 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'} color={'gray.700'}>
              <Text>
                Demopoly for
                </Text>
              <Text as={'span'} color={'blue.500'}>
                DAO Governance
              </Text>
          </Heading>
            <Box p={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Feature
                icon={<Icon as={FcAssistant} w={10} h={10} />}
                title={'Manage Polls'}
                text={
                    'Create polls and manage them with ease. Completely decentralized and blind voting'
                }
                />
                <Feature
                icon={<Icon as={FcDonate} w={10} h={10} />}
                title={'Vote'}
                text={
                    'Stay up to date with the latest polls and vote on them across all your DAOS'
                }
                />
            </SimpleGrid>
            </Box>
        </Stack>
      </Container>
    );
  }