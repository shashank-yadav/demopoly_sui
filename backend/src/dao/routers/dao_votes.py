import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Security
from users.utils.authentication_user import get_current_active_user
from users.models.users import UserModel
from ..crud.dao_votes import DAOVoteCollection
from ..models.dao_votes import (
    DAOVoteCreateBaseModel,
)

router = APIRouter()


@router.post(
    "/v1/dao-votes/create_vote",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def create_vote(
    vote_details: DAOVoteCreateBaseModel,
    current_user: UserModel = Security(
        get_current_active_user,
        scopes=["loggedin:write"],
    )
):
    try:
        vote_collection = DAOVoteCollection()
        insert_id = await vote_collection.create_vote(voter_id = current_user.username, vote_details=vote_details)

        return { "InternalResponseCode": 0, "Message": "Vote successfully created", "data": str(insert_id) } if insert_id else { "InternalResponseCode": 1, "Message": "Vote not created", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.post(
    "/v1/dao-votes/get_all_votes_for_user",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def get_all_votes_for_user(
    current_user: UserModel = Security(
        get_current_active_user,
        scopes=["loggedin:write"],
    ),
):
    try:
        vote_collection = DAOVoteCollection()
        vote = await vote_collection.get_all_votes_for_user(voter_id=current_user.username)
        return { "InternalResponseCode": 0, "Message": "Votes fetched", "data": vote } if vote else { "InternalResponseCode": 1, "Message": "Votes not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")