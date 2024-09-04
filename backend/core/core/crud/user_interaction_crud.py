from core import session, logger
from core.orm_models.user_interactions import UserInteractions
from datetime import datetime
import pytz

logging = logger(__name__)


class CRUDUserInteractions:
    def create(self, **kwargs):
        try:
            logging.info("CRUDUserInteractions create request")
            kwargs.update(
                {
                    "created_at": datetime.now(pytz.timezone("US/Eastern")),
                    "updated_at": datetime.now(pytz.timezone("US/Eastern")),
                }
            )
            user_interactions = UserInteractions(**kwargs)
            with session() as transaction_session:
                transaction_session.add(user_interactions)
                transaction_session.commit()
                transaction_session.refresh(user_interactions)
        except Exception as error:
            logging.error(f"Error in CRUDUserInteractions create function : {error}")
            raise error

    def read(self, interaction_id: str):
        try:
            logging.info("CRUDUserInteractions read request")
            with session() as transaction_session:
                obj: UserInteractions = (
                    transaction_session.query(UserInteractions)
                    .filter(UserInteractions.interaction_id == interaction_id)
                    .first()
                )
            if obj is not None:
                return obj.__dict__
            else:
                return None
        except Exception as error:
            logging.error(f"Error in CRUDUserInteractions read function : {error}")
            raise error

    def read_all(self):
        """[CRUD function to read_all Users record]

        Raises:
            error: [Error returned from the DB layer]

        Returns:
            [list]: [all user records]
        """
        try:
            logging.info("CRUDUserInteractions read_all request")
            with session() as transaction_session:
                obj: UserInteractions = transaction_session.query(
                    UserInteractions
                ).all()
            if obj is not None:
                return [row.__dict__ for row in obj]
            return []
        except Exception as error:
            logging.error(f"Error in CRUDUserInteractions read_all function : {error}")
            raise error

    def update(self, **kwargs):
        """[CRUD function to update a User record]

        Raises:
            error: [Error returned from the DB layer]
        """
        try:
            logging.info("CRUDUserInteractions update function")
            with session() as transaction_session:
                obj: UserInteractions = (
                    transaction_session.query(UserInteractions)
                    .filter(
                        UserInteractions.interaction_id == kwargs.get("interaction_id")
                    )
                    .update(kwargs, synchronize_session=False)
                )
                transaction_session.commit()
        except Exception as error:
            logging.error(f"Error in CRUDUserInteractions update function : {error}")
            raise error

    def delete(self, interaction_id: str):
        """[CRUD function to delete a User record]

        Raises:
            error: [Error returned from the DB layer]
        """
        try:
            logging.info("CRUDUserInteractions delete function")
            with session() as transaction_session:
                obj: UserInteractions = (
                    transaction_session.query(UserInteractions)
                    .filter(UserInteractions.interaction_id == interaction_id)
                    .first()
                )
                transaction_session.delete(obj)
                transaction_session.commit()
                return obj.__dict__
        except Exception as error:
            logging.error(f"Error in CRUDUserInteractions delete function : {error}")
            raise error
