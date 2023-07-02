import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Image,
  Box,
  Progress,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  useDisclosure,
} from "@chakra-ui/react";
import { PollCreateBaseModel } from "../models/PollCreateBaseModel";
import { Poll } from "../models/Poll";
import { ClickState } from "../models/ClickState";
import { VoteState } from "../models/BallotState";
import { StakeState } from "../models/StakeState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalBallot from "./ModalBallot";
import { UserVote } from "../models/UserVote";

const PollCard: React.FC<{
  poll: PollCreateBaseModel;
  setClickState: React.Dispatch<React.SetStateAction<ClickState>>;
  voteState: VoteState;
  setVoteState: React.Dispatch<React.SetStateAction<VoteState>>;
  userVotes: UserVote[] | undefined;
  setUserVotes: React.Dispatch<React.SetStateAction<UserVote[] | undefined>>;
  bearer: string;
  publicKey: any;
}> = ({
  poll,
  setClickState,
  voteState,
  setVoteState,
  userVotes,
  setUserVotes,
  bearer,
  publicKey,
}) => {

  const notifyFailure = () => {
    toast.error("Connect your wallet to vote", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const {
    isOpen: isOpenBallot,
    onOpen: onOpenBallot,
    onClose: onCloseBallot,
  } = useDisclosure();
  const {
    isOpen: isOpenStake,
    onOpen: onOpenStake,
    onClose: onCloseStake,
  } = useDisclosure();

  return (
    <Card variant="elevated" maxW={"md"} minW={"md"} p={5}>
      <CardHeader>
        <Heading size="md" alignItems={"left"} textAlign={"left"} alignSelf={"left"}> {poll.poll_title}</Heading>
      </CardHeader>
      <CardBody>
        <Box
          overflow="hidden"
          justifyContent="center"
          display={"flex"}
          alignItems="center"
        >
        </Box>
        <Text textAlign={"left"}><b>Option 1:</b> {poll.options?.[0]} </Text>
        <Text textAlign={"left"}><b>Option 2:</b> {poll.options?.[1]} </Text>
      </CardBody>
      <CardFooter
        justify="center"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            if (!publicKey) {
              notifyFailure();
            } else {
              setClickState({
                poll_id: poll.poll_id,
                button: "vote",
              });
              onOpenBallot();
            }
          }}
        >
          Vote
        </Button>
      </CardFooter>
      <ModalBallot
        poll={poll}
        voteState={voteState}
        setVoteState={setVoteState}
        userVotes={userVotes}
        setUserVotes={setUserVotes}
        bearer={bearer}
        isOpen={isOpenBallot}
        onOpen={onOpenBallot}
        onClose={onCloseBallot}
      />
    </Card>
  );
};

export default PollCard;