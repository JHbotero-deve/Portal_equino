from pydantic import BaseModel
from datetime import datetime


class ReportResponse(BaseModel):
    id: int
    name: str
    created_at: datetime
