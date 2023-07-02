import React from "react";
import { Box, Flex, Stack, Text, Container } from "@chakra-ui/react";
import FeatureCard from "./FeatureCard";
import { faClipboardList, faUserGear, faPeopleRoof, faChartLine, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const features_1: any[] = [
  {
    title: "Create and Track Proposals",
    description: "Quick login, proposal drafting, and voter inclusion. Voting proposals are effortlessly monitored with real time analytics",
    icon: faClipboardList
  },
  {
    title: "User Dashboard",
    description: "Enables users to effortlessly monitor their activities, including voted and created proposals, and track upcoming proposals.",
    icon: faChartLine
  },
  {
    title: "Manage Voters",
    description: "Eases voter management via wallet address, allowing setting of access roles like admin, council, vetoers, management, members etc.",
    icon: faPeopleRoof
  }
];

const features_2: any[] = [
    {
      title: "Customization",
      description: "Voters can personalize their profiles with names and images for proposal identification, and add custom features on their profiles.",
      icon: faUserGear
    },
    {
      title: "Unbiased Voting",
      description: "Voters are not affected by initial majority bias or copy voting, and hence polls reflect the true mandate of the people",
      icon: faCircleCheck
    },
    // {
    //     title: "Unbiased Voting",
    //     description: "Users or voters can customize their profiles to give an identity to their proposals. They can add profile pictures add names.",
    //     icon: faCircleCheck
    // }
];

const FeatureCardGrid: React.FC<{
}> = ({
}) => {
  return (
    <Container maxW={'5xl'} p={2}>
    <Box pt={20}>
      <Text fontSize="3xl" color={"gray.700"} fontWeight={600} pb={10}>
        Features of Demopoly
      </Text>
      <Flex width="100%" wrap="wrap" justify="space-between">
      <Stack
        direction={{ base: "column", md: "row" }}
        pt={10}
        pb={5}
        spacing={10}
        mx={4}
        width={"100%"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        {features_1.map((feature) => (
          <FeatureCard
            feature={feature}
          />
        ))}
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        pt={16}
        pb={5}
        spacing={10}
        mx={4}
        width={"100%"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        {features_2.map((feature) => (
          <FeatureCard
            feature={feature}
          />
        ))}
      </Stack>
      </Flex>
    </Box>
    </Container>
  );
};

export default FeatureCardGrid;