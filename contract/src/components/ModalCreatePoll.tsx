import React, { useState, ChangeEvent, FormEvent } from "react";
import { createPoll } from "../api/api";

import {
  Button,
  Image,
  Box,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure
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

import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { packageAddress } from "../Constants";

const ModalCreatePoll: React.FC<{
  bearer: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({
  bearer,
  isOpen,
  onOpen,
  onClose,
}) => {

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const wallet = useWallet();

  const [formData, setFormData] = useState({ poll_code: "", question: "", option1: "", option2: "" });

  const notifyPollCreationFailure = () => {
    toast.error("Could not create poll", {
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

  async function createPollOnChain(wallet: any) {
    if (wallet === undefined) {
      return undefined;
    }

    const tx = new TransactionBlock();
    var date = new Date();
    date.setDate(date.getDate() + 30);
    tx.moveCall({
      target: `${packageAddress}::dao_polls::create_poll` as any,
      arguments: [tx.pure(formData.poll_code), tx.pure(date.getTime()), tx.pure(2)],
    });
    return await wallet.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    createPollOnChain(wallet)
    .then((response: any) => {
      createPoll(bearer, formData.poll_code, formData.question, formData.option1, formData.option2)
      .then((response: any) => {
          onClose();
      })
      .catch((err: any) => {
        notifyPollCreationFailure();
      })
    })
    .catch((err: any) => {
      notifyPollCreationFailure();
    })
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Poll</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
        <Box>
            <VStack spacing={5} as="form" onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Unique Poll Code</FormLabel>
                <Input 
                    type="text" 
                    name="poll_code" 
                    value={formData.poll_code} 
                    onChange={handleChange}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Question</FormLabel>
                <Input 
                    type="text" 
                    name="question" 
                    value={formData.question} 
                    onChange={handleChange}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Option1</FormLabel>
                <Input 
                    type="text" 
                    name="option1" 
                    value={formData.option1} 
                    onChange={handleChange}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Option2</FormLabel>
                <Input 
                    type="text" 
                    name="option2" 
                    value={formData.option2} 
                    onChange={handleChange}
                />
                </FormControl>
                <Button type="submit" colorScheme="blue">Submit</Button>
            </VStack>
        </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreatePoll;