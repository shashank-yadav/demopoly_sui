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
    useColorModeValue,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from '@chakra-ui/react';

const FAQs = [
    {
        question: "What is Demopoly?",
        answer: "Demopoly is a decentralized voting platform that allows users to create, vote, and verify votes on the blockchain. This can be either directly integrated into current DAO governance stacks by calling the Open Source smart contracts, or adopted as an easy to implement governance solution in the form of the Demopoly Protocol's platform."
    },
    {
        question: "What is a secret voting website for DAOs?",
        answer: " A secret voting website for DAOs is a platform that allows members of a decentralized autonomous organization (DAO) to vote on proposals without revealing their identities. This can help to protect voters from intimidation or retaliation, and it can also help to ensure that the voting process is fair and unbiased."
    },
    {
        question: "What is a blind voting platform?",
        answer: "A blind voting platform is a platform that allows polls to take place with the current results kept hidden until the poll ends. This prevents copy voting, and also ensures that the voters are not influenced by the majoroty bias."
    },
    {
        question: "What are the benefits of using the Demopoly website for DAOs?",
        answer: "There are a number of benefits for DAOs. Improved decision-making: The protocol improves decision-making by making it easier for DAOs to get a true and unbiased sense of the will of the community. Increased voter participation: Blind & Secret voting can help to increase voter participation by making it easier for voters to vote without fear of reprisal. Increased transparency: Voters can verify their votes and their weightage in the decision making at any point. Post revelation, the decrypted votes exist on chain so anyone can go back and verify the results for all historic decisions. Trust in DAO Governance: Transparency, better governance and increased member participation not only makes the DAO function more efficiently, but also increases external trust in the DAO, increasing its value.",
    }
]

export default function FAQ() {
    return (
    <Container maxW={'5xl'} p={2} mt={24}>
        <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '3xl', md: '3xl' }}
            color={'gray.700'}
            lineHeight={'110%'}>
            Frequently Asked Questions
        </Heading>
        <Accordion allowToggle pt={16} pb={28}>
            {FAQs.map((faq) => (
                <AccordionItem border={'0'}>
                    <h2>
                    <AccordionButton bgColor={'blue.200'} mt={5} p={3} rounded={5}>
                        <Box as="span" flex='1' textAlign='left'>
                            <Text ml={3} fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }} color={'gray.700'}>{faq.question}</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <Text textAlign={'left'} fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }} color={'gray.500'}>
                        {faq.answer}
                    </Text>
                    </AccordionPanel>
                </AccordionItem>
            ))
            }
        </Accordion>
    </Container>
    );
  }