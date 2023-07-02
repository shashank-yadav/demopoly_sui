import React from "react";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Poll } from "../models/Poll";
import { PollCreateBaseModel } from "../models/PollCreateBaseModel";
import PollCard from "./PollCard";
import { ClickState } from "../models/ClickState";
import { VoteState } from "../models/BallotState";
import { StakeState } from "../models/StakeState";
import { UserVote } from "../models/UserVote";

const PollCardGrid: React.FC<{
  polls: PollCreateBaseModel[];
  setClickState: React.Dispatch<React.SetStateAction<ClickState>>;
  voteState: VoteState;
  setVoteState: React.Dispatch<React.SetStateAction<VoteState>>;
  userVotes: UserVote[] | undefined;
  setUserVotes: React.Dispatch<React.SetStateAction<UserVote[] | undefined>>;
  bearer: string;
  publicKey: any;
}> = ({
  polls,
  setClickState,
  voteState,
  setVoteState,
  userVotes,
  setUserVotes,
  bearer,
  publicKey,
}) => {
  return (
    // <SimpleGrid p={4} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
    <Box pt={20}>
      <Text fontSize="2xl" color={"gray.700"} fontWeight={500}>
        Ongoing Polls
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
        {polls?.map((poll) => (
          <PollCard
            poll={poll}
            setClickState={setClickState}
            voteState={voteState}
            setVoteState={setVoteState}
            userVotes={userVotes}
            setUserVotes={setUserVotes}
            bearer={bearer}
            publicKey={publicKey}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default PollCardGrid;