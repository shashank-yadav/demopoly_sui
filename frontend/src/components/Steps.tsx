import {
    chakra,
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue
  } from '@chakra-ui/react';

import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

const steps = [
    {
        title: "Poll Creation",
        text: "A creator specifies the poll title, description and possible outcomes (binary for now). Also uploads the wallet addresses and corresponding voting power.",
        icon: "FcAssistant"
    },
    {
        title: "Voting",
        text: "Each validator will be staking the demopoly tokens for the right to be the polling authority i.e. generate private-public keypair. Once selected, the public key will be sent to the voter and used to encrypt the vote. The encrypted vote will be added to the chain. The process repeats for each vote.",
    },
    {
        title: "Consolidation",
        text: "Each of the validators will decrypt the votes they'd encrypted and update the vote counts (based on voting power) on the chain, without revealing individual votes."
    }
]
interface StepProps {
    title: string;
    text: string;
    icon: string;
  }
  
const Step = ({ title, text, icon }: StepProps) => {
    
    return (
        <Stack>
        <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
            color={'gray.700'}
            lineHeight={'110%'}>
            {title}
          </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}>{text}</Text>
        </Stack>
        // </Box>
    );
};
  
  export default function Steps() {
    return (
      <Container maxW={'5xl'} p={10}>
        <Stack
          textAlign={'left'}
          align={'left'}
          spacing={{ base: 8, md: 10 }}
          pt={20}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '3xl', md: '3xl' }}
            lineHeight={'110%'} color={'gray.700'}
            textAlign={"center"}
            pb={5}>
            The Voting Process
          </Heading>
            <Box pt={5}>
            <SimpleGrid columns={1} spacing={10}>
                {steps.map((step) => (
                    <Step
                        title={step.title}
                        text={step.text}
                        icon={""}
                    />
                ))}
            </SimpleGrid>
            </Box>
        </Stack>
      </Container>
    );
  }