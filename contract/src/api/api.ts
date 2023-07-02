import axios, { AxiosResponse } from 'axios';
import { PollCreateBaseModel } from '../models/PollCreateBaseModel';
import { LoginInput } from '../models/LoginInput'
import { LoginDetails } from '../models/LoginDetails'
import qs from 'qs';

const BASEURL = "https://suidaovoting.w3bber.com/v1"

// export const createPoll = async ()

export const login = async (loginInput: LoginInput) => {
    const api_call: string = `${BASEURL}/login_or_create?wallet_id=${loginInput.username}`
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
        },
    };
    return axios.post<LoginDetails>(api_call, qs.stringify(loginInput), config);
};

export const getActivePolls = async (bearerToken: string) => {
    if(bearerToken === ""){
        return;
    }
    const api_call: string = `${BASEURL}/dao-polls/get_all_active_polls`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    console.log(api_call, config);
    return axios.get(api_call, config);
}

export const createPoll = async (bearerToken: string, poll_id: string, question: string, option1: string, option2: string) => {
    const api_call: string = `${BASEURL}/dao-polls/create_poll`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
        "poll_id": poll_id,
        "poll_title": question,
        "max_options": 2,
        "options": [option1, option2],
    }
    return axios.post(api_call, body, config );
}

export const getAllVotesForUser = async (bearerToken: string) => {
    const api_call: string = `${BASEURL}/dao-votes/get_all_votes_for_user`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
    }
    return axios.post(api_call, body, config );
}

export const castVote = async (bearerToken: string, poll_id: string, option: string) => {
    const api_call: string = `${BASEURL}/dao-votes/create_vote`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
        "poll_id": poll_id,
        "encrypted_vote": option
    }
    return axios.post(api_call, body, config );
}