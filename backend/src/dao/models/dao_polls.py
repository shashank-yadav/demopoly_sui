from datetime import datetime, timedelta
from typing import List, Optional

from db.mongo.mongo_model import OID, MongoModel
from pydantic import BaseModel, Field


class DAOPollCreateBaseModel(MongoModel):
    poll_id: str
    poll_title: str
    max_options: int
    options: List[str]
    public_key: Optional[str] = ""
    voting_deadline: Optional[datetime] = datetime.now() + timedelta(days=30)

class DAOPollCreateModel(DAOPollCreateBaseModel):
    created_by: str
    created_at : datetime = datetime.now()
    secret_key: Optional[str] = None
    result: Optional[float] = None
    is_updated : Optional[bool] = False
    updated_at : Optional[datetime] = None
    is_deleted : Optional[bool] = False
    deleted_at : Optional[datetime] = None

class DAOPollModelOut(DAOPollCreateBaseModel):
    id: OID = Field()