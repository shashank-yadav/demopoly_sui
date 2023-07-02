from datetime import datetime
from typing import List, Optional

from db.mongo.mongo_model import OID, MongoModel
from pydantic import BaseModel, Field


class DAOVoteCreateBaseModel(MongoModel):
    poll_id: str
    encrypted_vote: str

class DAOVoteCreateModelIn(DAOVoteCreateBaseModel):
    voter_id: str

class DAOVoteCreateModel(DAOVoteCreateModelIn):
    voter_id: str
    created_at : datetime = datetime.now()
    is_updated : Optional[bool] = False
    updated_at : Optional[datetime] = None
    is_deleted : Optional[bool] = False
    deleted_at : Optional[datetime] = None

class DAOVoteUpdateBaseModel(BaseModel):
    poll_id: str
    encrypted_vote: Optional[str] = None

class DAOVoteUpdateModel(DAOVoteUpdateBaseModel):
    is_updated : bool = False
    updated_at : Optional[datetime] = datetime.now()

class DAOVoteModelOut(DAOVoteCreateModelIn):
    id: OID = Field()