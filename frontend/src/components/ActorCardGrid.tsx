import React from "react";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import ActorCard from "./ActorCard";

const actors: any[] = [
  {
    id: "1",
    title: "Creator",
    description: "Creates the poll and distributes tokens with voting rights"
  },
  {
    id: "2",
    title: "Voter",
    description: "Stakes tokens and votes on the proposal in an encrypted manner"
  },
  {
    id: "3",
    title: "Validator",
    description: "Helps encrypt votes and later decrypts to generate results"
  }
];

const ActorCardGrid: React.FC<{
}> = ({
}) => {
  return (
    <Container maxW={'5xl'}>
    <Box pt={20}>
      <Text fontSize="3xl" color={"gray.700"} fontWeight={500} pb={2}>
        Parties Involved
      </Text>
      <Stack
        direction={{ base: "column", md: "row" }}
        pt={10}
        pb={5}
        spacing={10}
        mx={4}
        justifyContent={"center"}
        textAlign={"center"}
      >
        {actors.map((actor) => (
          <ActorCard
            actor={actor}
          />
        ))}
      </Stack>
    </Box>
    </Container>
  );
};

export default ActorCardGrid;