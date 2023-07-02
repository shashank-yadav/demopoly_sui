import logging
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException
from db.mongo.collections import DAO_POLLS
from db.mongo.mongo_base import MongoBase
from master.models.master import BaseIsCreated
from db.mongo.mongo_model import OID
from ..models.dao_polls import (
    DAOPollCreateBaseModel,
    DAOPollCreateModel,
    DAOPollModelOut
)

class DAOPollCollection:
    def __init__(self):
        self.collection = MongoBase()
        self.collection(DAO_POLLS)


    async def create_poll(
        self,
        poll_details: DAOPollCreateBaseModel,
        username: str
    ) -> any:
        try:
            existing_poll = await self.get_poll_by_id(poll_id=poll_details.poll_id)
            if existing_poll is not None:
                return None

            poll_details_full = DAOPollCreateModel(
                **poll_details.dict(),
                created_by=username
            )

            insert_id = await self.collection.insert_one(
                poll_details_full.dict(),
                return_doc_id=True,
                extended_class_model=BaseIsCreated,
            )

            return insert_id if insert_id else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_polls(
            self
        ) -> any:
        try:
            filter_condition = {"is_deleted": False}

            sort = [("created_at", -1)]
            data = await self.collection.find(
                finder=filter_condition,
                return_doc_id=True,
                sort=sort,
                extended_class_model=DAOPollModelOut,
            )

            return data if data else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_poll_by_id(
        self,
        poll_id: str
    ) -> any:
        try:
            finder = {"poll_id": poll_id}

            poll = await self.collection.find_one(
                finder=finder,
                return_doc_id=True,
                extended_class_model=DAOPollModelOut
            )

            return poll if poll else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")