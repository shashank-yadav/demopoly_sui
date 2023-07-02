import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Security
from users.utils.authentication_user import get_current_active_user
from ..crud.dao_polls import DAOPollCollection
from ..models.dao_polls import (
    DAOPollCreateBaseModel
)

router = APIRouter()


@router.post(
    "/v1/dao-polls/create_poll",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def create_poll(
    poll_details: DAOPollCreateBaseModel,
    current_user: Optional[dict] = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        poll_collection = DAOPollCollection()
        insert_id = await poll_collection.create_poll(poll_details=poll_details, username = current_user.username)

        return { "InternalResponseCode": 0, "Message": "Poll successfully created", "data": str(insert_id) } if insert_id else { "InternalResponseCode": 1, "Message": "Poll not created", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/dao-polls/get_all_active_polls",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_all_active_polls():
    try:
        poll_collection = DAOPollCollection()
        poll_list = await poll_collection.get_all_polls()
                                                        
        return { "InternalResponseCode": 0, "Message": "Polls fetched", "data": poll_list } if poll_list else { "InternalResponseCode": 1, "Message": "Polls not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")