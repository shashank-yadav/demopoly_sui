import React, { FC, ReactNode, useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Nav from "./components/header";
import {
  chakra,
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
  useTimeout,
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
import "@suiet/wallet-kit/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginInput } from "./models/LoginInput";
import ActorCardGrid from "./components/ActorCardGrid";
import Steps from "./components/Steps";
import FeatureCardGrid from "./components/FeatureCardGrid";
import FAQ from "./components/FAQ";

import {
  login
} from "./api/api";
import { ClickState } from "./models/ClickState";
import { VoteState } from "./models/BallotState";
import { PollCreateBaseModel } from "./models/PollCreateBaseModel";
import { getAllVotesForUser, getActivePolls } from "./api/api";
import { UserVote } from "./models/UserVote";

import About from "./components/About";
import ModalCreatePoll from "./components/ModalCreatePoll";
import PollCardGrid from "./components/PollCardGrid";

require("./App.css");

const App: FC = () => {
  return (
  <Content />
  );
};
export default App;


const Content: FC = () => {
  const wallet = useWallet();

  const [clickState, setClickState] = useState<ClickState>({
    poll_id: "",
    button: "",
  });

  const [voteState, setVoteState] = useState<VoteState>({
    poll_id: "",
    option: "",
  });

  const [guestBearer, setGuestBearer] = useState("");
  const [bearer, setBearer] = useState("");
  const [publicKey, setPublicKey] = useState<any>();

  const [polls, setPolls] = useState<PollCreateBaseModel[]>();
  const [userVotes, setUserVotes] = useState<UserVote[]>();

  const loginInput: LoginInput = {
    username: "test",
    password: "test",
  };

  useEffect(() => {
    if (!wallet.connected) {
      return;
    }
    const publicKey = wallet.account?.address;
    if (!publicKey) {
      return;
    }
    setPublicKey(publicKey);
  }, [wallet.connected]);

  useEffect(() => {
    login(loginInput)
      .then((response: any) => {
        setGuestBearer(response.data.access_token);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    const loginData = {
      username: publicKey,
      password: "test",
    };

    login(loginData)
      .then((response: any) => {
        setBearer(response.data.access_token);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [publicKey]);

  useEffect(() => {
    // setInterval( () => {
    getActivePolls(guestBearer)
      .then((response: any) => {
        if (guestBearer === "") {
          return;
        }
        const pollsFromApi = response.data.data;
        setPolls(pollsFromApi);
      })
      .catch((err: any) => {
        console.error(err);
      });
    // }, 100000);
  }, [guestBearer]);


  useEffect(() => {
    if (bearer === "") {
      return;
    }

    getAllVotesForUser(bearer)
      .then((response: any) => {
        if(response.data.data == undefined){
          setUserVotes([]);
        }else{
          const uv = response.data?.data.map((x: any) => {
            return {
              poll_id: x.poll_id,
              option: x.encrypted_vote,
            } as UserVote;
          });
          setUserVotes(uv);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [bearer]);

  const {
    isOpen: isOpenCreatePoll,
    onOpen: onOpenCreatePoll,
    onClose: onCloseCreatePoll,
  } = useDisclosure();

  const notifyCreatePollFailure = () => {
    toast.error("Connect your wallet to create a poll", {
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

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Nav></Nav>
      <About></About>
      <Button
          variant="outline"
          onClick={() => {
            if (!publicKey) {
              notifyCreatePollFailure();
            } else {
              setClickState({
                poll_id: "",
                button: "createPoll",
              });
              onOpenCreatePoll();
            }
          }}
        >
          Create Poll
      </Button>
      <ModalCreatePoll
        bearer={bearer}
        isOpen={isOpenCreatePoll}
        onOpen={onOpenCreatePoll}
        onClose={onCloseCreatePoll}
      />
      {polls !== undefined ? (
        <PollCardGrid
          polls={polls}
          setClickState={setClickState}
          voteState={voteState}
          setVoteState={setVoteState}
          userVotes={userVotes}
          setUserVotes={setUserVotes}
          bearer={bearer}
          publicKey={publicKey}
        />
      ) : null}
      <ActorCardGrid></ActorCardGrid>
      <Steps></Steps>
      <FeatureCardGrid></FeatureCardGrid>
      <FAQ></FAQ>
    </div>
  );
};