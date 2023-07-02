module dao_voting::dao_polls {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use std::option::{Self, Option};
    use sui::dynamic_object_field as ofield;
    use std::string::{Self, String};

    struct Poll has key {
        id: UID,
        poll_id: String,
        status: String,
        voting_deadline: u64,
        max_options: u32,
        result: Option<u8>,
        public_key: Option<String>,
        secret_key: Option<String>
    }

    struct Vote has key, store {
        id: UID,
        poll_id: String,
        encrypted_vote: String
    }

    public entry fun create_poll(poll_id: vector<u8>, voting_deadline: u64, max_options: u32, ctx: &mut TxContext) {
        let poll = Poll {
            id: object::new(ctx),
            poll_id: string::utf8(poll_id),
            status: string::utf8(b"Started"),
            voting_deadline: voting_deadline,
            max_options: max_options,
            result: option::none(),
            public_key: option::none(),
            secret_key: option::none()
        };

        transfer::transfer(poll, tx_context::sender(ctx));
    }

    public entry fun finish_poll(poll: &mut Poll) {
        poll.status = string::utf8(b"Finished");
    }

    public entry fun cancel_poll(poll: &mut Poll) {
        poll.status = string::utf8(b"Cancelled");
    }

    public entry fun reveal_poll(poll: &mut Poll, result: u8, public_key: vector<u8>, secret_key: vector<u8>) {
        let old_result = option::swap_or_fill(&mut poll.result, result);
        _ = old_result;

        let old_public_key = option::swap_or_fill(&mut poll.public_key, string::utf8(public_key));
        _ = old_public_key;

        let old_secret_key = option::swap_or_fill(&mut poll.secret_key, string::utf8(secret_key));
        _ = old_secret_key;
    }

    public entry fun create_vote(poll_id: vector<u8>, encrypted_vote: vector<u8>, ctx: &mut TxContext) {
        let vote = Vote {
            id: object::new(ctx),
            poll_id: string::utf8(poll_id),
            encrypted_vote: string::utf8(encrypted_vote)
        };

        transfer::transfer(vote, tx_context::sender(ctx));
    }

    public entry fun update_vote(vote: &mut Vote, encrypted_vote: vector<u8>) {
        vote.encrypted_vote = string::utf8(encrypted_vote);
    }

    public entry fun add_vote(poll: &mut Poll, vote: Vote) {
        let vote_id = object::id(&vote);
        ofield::add(&mut poll.id, vote_id, vote);
    }
}