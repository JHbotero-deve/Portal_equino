from typing import List
from .repository import ReportRepository


class ReportService:
    def __init__(self, repo: ReportRepository | None = None):
        self._repo = repo or ReportRepository()

    def list_reports(self) -> List:
        return self._repo.fetch_reports()
