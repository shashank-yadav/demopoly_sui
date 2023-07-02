import React, { useState } from "react";
import { castVote } from "../api/api";
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
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Editable,
  EditablePreview,
  EditableInput,
  Center,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Input
} from "@chakra-ui/react";
import { TransactionBlock, fromB64 } from "@mysten/sui.js";
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI,
} from "@suiet/wallet-kit";
import { PollCreateBaseModel } from "../models/PollCreateBaseModel";
import { Poll } from "../models/Poll";
import { VoteState } from "../models/BallotState";

import { UserVote } from "../models/UserVote";
import { packageAddress } from "../Constants";

const ModalBallot: React.FC<{
  poll: PollCreateBaseModel;
  voteState: VoteState;
  setVoteState: React.Dispatch<React.SetStateAction<VoteState>>;
  userVotes: UserVote[] | undefined;
  setUserVotes: React.Dispatch<React.SetStateAction<UserVote[] | undefined>>;
  bearer: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({
  poll,
  voteState,
  setVoteState,
  userVotes,
  setUserVotes,
  bearer,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [vote, setVote] = useState('');
  const wallet = useWallet();

  const getExistingVote = () => {
    if (userVotes === undefined) {
      const x: UserVote[] = [];
      return x;
    }
    return userVotes!.filter((x) => x.poll_id === poll.poll_id);
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  async function createVote(
    sel: VoteState,
    vote: number
  ) {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${packageAddress}::dao_polls::create_vote` as any,
        arguments: [tx.pure(sel.poll_id), tx.pure(sel.option)],
      });
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      }).then((response: any) => {
        castVote(bearer, sel.poll_id, sel.option)
        .then((response: any) => {
          setVoteState(sel);
          const updatedUserVotes = [...userVotes!, sel];
          setUserVotes(updatedUserVotes);
          console.log(userVotes!);
        })
        .catch((err: any) => {
          console.error(err);
        });
      }).catch((err: any) => {
        console.error("createVote failed", err);
        alert("createVote failed (see response in the console)");
      });
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  }

  function generateString(length: number) {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton/>
        <ModalBody pb={6}>
          <Center>
            <Card maxW="md" justifyContent="center" p={5} shadow={'none'}>
              <CardHeader>
                <Heading size="md"> {poll.poll_title} </Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <Text>
                    <b>Option 1:</b> {poll.options[0]}
                  </Text>
                  <Text>
                    Any positive number between 0 and 10000 represents a vote for option 1.
                  </Text>
                  <Text>{}</Text>
                  <Text>{}</Text>
                  <Text>
                    <b>Option 2:</b> {poll.options[1]}
                  </Text>
                  <Text>
                    Any negative number between -10000 and 0 represents a vote for option 2.
                  </Text>
                </Stack>
                <Box
                  overflow="hidden"
                  justifyContent="center"
                  display={"flex"}
                  alignItems="center"
                ></Box>
                <Text> {poll.description} </Text>
              </CardBody>

              {getExistingVote() !== undefined &&
              getExistingVote().length !== 0 ? (
                <Box flex={1} justifyContent={"center"} textAlign={"center"}>
                  {/* <Text fontWeight={"bold"} color={"gray.700"}>
                    You Voted:
                  </Text> */}
                  <Text p={5}><b>Your Encrypted Vote:</b></Text>
                  <Text
                    color={"blue.500"}
                    fontWeight={600}
                    fontSize={{ base: "sm", sm: "sm", md: "sm" }}
                  >
                    {getExistingVote()[0].option}
                  </Text>
                </Box>
              ) : undefined}
              <CardFooter
                justifyContent="center"
                hidden={
                  getExistingVote() !== undefined &&
                  getExistingVote().length !== 0
                }
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Input
                  value={vote}
                  onChange={(e) => {
                    setVote(e.target.value);
                  }}
                  placeholder='Enter your number as vote' />
                <Button
                    flex={0.5}
                    bgColor={"blue.500"}
                    mt={5}
                    onClick={() => {
                      const vote_number = parseFloat(vote);
                      var regex = /^\d+(\.\d+)?$/;
                      if (!regex.test(vote) || (vote_number > 10000 || vote_number < -10000)) {
                        alert("Please enter a number between -10000 and 10000");
                        return;
                      }
                      else {
                        const sel = {
                          poll_id: poll.poll_id,
                          option: generateString(120),
                        };

                        createVote(sel, vote_number);
                      };
                    }}
                >Submit</Button>
              </CardFooter>
            </Card>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalBallot;
