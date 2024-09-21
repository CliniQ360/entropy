from google.cloud import storage
from core import logger
import os

logging = logger(__name__)
storage_client = storage.Client(project=os.getenv("PROJECT_ID"))
# TODO: add try except blocks to handle exceptions


def get_content_type(file_uri: str):
    file_path = file_uri.split("gs://")[-1]
    bucket_name = file_path.split("/")[0]
    file_name = file_path.split(f"{bucket_name}/")[-1]
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.get_blob(file_name)
    logging.info(f"{blob=}")
    return blob.content_type


def upload_blob_string(
    bucket_name: str, destination_file_name: str, content_type: str, file
):
    try:
        """Uploads a file to the bucket."""
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_file_name)
        blob.upload_from_string(file, content_type=content_type)
        gcs_uri = "gs://" + bucket_name + "/" + destination_file_name
        logging.info(f"{gcs_uri=}")
        return gcs_uri
    except Exception as error:
        raise error


def list_blobs(bucket_name: str, prefix: str = None):
    blobs = storage_client.list_blobs(bucket_or_name=bucket_name, prefix=prefix)
    list_of_blobs = []
    for blob in blobs:
        list_of_blobs.append(blob.name)
    logging.info(f"{list_of_blobs=}")
    return list_of_blobs


def download_blob(source_blob_name):
    if os.environ.get("LOCAL_TESTING"):
        bucket_name = os.environ["PE_DATA_SOURCE"].rstrip()
    else:
        bucket_name = open("/app/secrets/PE_DATA_SOURCE/latest", "r").read().rstrip()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    logging.info(f"{blob=}")
    contents = blob.download_as_bytes()
    return contents


def create_blob_folder(bucket_name, folder_name):
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(f"{folder_name}/")
    blob.upload_from_string("")
    return bucket
