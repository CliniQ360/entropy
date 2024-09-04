# from src.crud.user_crud import CRUDUser
# from src.crud.user_roles_crud import CRUDUserRole
# from src.controllers.user_management.user_management_controller import (
#     UserManagementController,
# )
# from src.apis.schemas.requests.user_management.user_request import Register
# from datetime import datetime
# import os


# def create_user_role(user_role_record: list):
#     user_roles = CRUDUserRole().read_all()
#     if len(user_roles) == 0:
#         for item in user_role_record:
#             CRUDUserRole().create(**item)
#     else:
#         pass


# def create_admin_user(admin_user_request):
#     existing_admin_user = CRUDUser().read(user_name="admin")
#     if not existing_admin_user:
#         _ = UserManagementController().register_user_controller(
#             request=admin_user_request
#         )
#     else:
#         pass


# def main():
#     user_role_record = [
#         {
#             "user_role": "admin",
#             "user_role_id": 1,
#             "created_at": datetime.now(),
#             "updated_at": datetime.now(),
#         },
#         {
#             "user_role": "doctor",
#             "user_role_id": 2,
#             "created_at": datetime.now(),
#             "updated_at": datetime.now(),
#         },
#         {
#             "user_role": "staff",
#             "user_role_id": 3,
#             "created_at": datetime.now(),
#             "updated_at": datetime.now(),
#         },
#     ]
#     create_user_role(user_role_record)
#     admin_user_request = Register(
#         user_name="admin",
#         password="P@ssw0rd",
#         full_name="Admin User",
#         email_id="admin",
#         user_role="admin",
#         user_role_id=1,
#     )
#     create_admin_user(admin_user_request=admin_user_request)
