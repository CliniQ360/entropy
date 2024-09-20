# Database Manager
from core.database.database_manager import DatabaseManager

from commons.logger import logger

database_manager = DatabaseManager.sharedInstance()
Base = database_manager.Base
from core.database.context_manager import session

# from core.agents.workflow import build_workflow

# workflow = build_workflow()
# Create Tables
from core.orm_models import *

Base.metadata.create_all(bind=database_manager.engine)
