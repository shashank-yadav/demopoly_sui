from fastapi import HTTPException
from db.mongo.collections import DAO_VOTES
from db.mongo.mongo_base import MongoBase
from master.models.master import BaseIsCreated
from ..models.dao_votes import (
    DAOVoteCreateBaseModel,
    DAOVoteCreateModelIn,
    DAOVoteModelOut
)

class DAOVoteCollection:
    def __init__(self):
        self.collection = MongoBase()
        self.collection(DAO_VOTES)


    async def create_vote(
        self,
        voter_id: str,
        vote_details: DAOVoteCreateBaseModel
    ) -> any:
        try:
            existing_vote = await self.get_user_vote(poll_id=vote_details.poll_id, voter_id=voter_id)
            if existing_vote is not None:
                return None

            vote_details_full = DAOVoteCreateModelIn(
                **vote_details.dict(),
                voter_id=voter_id
            )

            insert_id = await self.collection.insert_one(
                vote_details_full.dict(),
                return_doc_id=True,
                extended_class_model=BaseIsCreated,
            )

            return insert_id if insert_id else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_user_vote(
        self,
        poll_id: str,
        voter_id: str
    ) -> any:
        try:
            finder = {"poll_id": poll_id, "voter_id": voter_id}

            vote = await self.collection.find_one(
                finder=finder,
                return_doc_id=True,
                extended_class_model=DAOVoteModelOut
            )

            return vote if vote else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_votes_for_user(
        self,
        voter_id: str
    ) -> any:
        try:
            finder = {"voter_id": voter_id}

            vote = await self.collection.find(
                finder=finder,
                return_doc_id=True,
                extended_class_model=DAOVoteModelOut
            )

            return vote if vote else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")