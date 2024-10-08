import requests
import json
from core import logger
import http.client

logging = logger(__name__)


class APIInterface:
    @staticmethod
    def post(route, data=None, json=None, headers=None):
        try:
            url = route
            logging.info("POST request sent")
            logging.debug(f"url = {url}, data = {data}")
            response = requests.post(url, data=data, json=json, headers=headers)
            # if response.status_code >= 400:
            #     raise Exception(
            #         f"Call to {route} failed with {response.status_code} and response {response.text}"
            #     )
            # logging.debug(f"response = {response}")
            logging.debug(
                f"response.text = {response.text}, response.status_code = {response.status_code}"
            )
            if response.text:
                return response.json(), response.status_code
            return None, response.status_code
        except Exception as error:
            logging.error(f"Error in POST API request: {error}")
            raise error

    @staticmethod
    def post_without_logs(route, data=None, json=None, headers=None):
        try:
            url = route
            logging.info("POST request sent")
            logging.debug(f"url = {url}, data = {data}")
            response = requests.post(url, data=data, json=json, headers=headers)
            # if response.status_code >= 400:
            #     raise Exception(
            #         f"Call to {route} failed with {response.status_code} and response {response.text}"
            #     )
            # logging.debug(f"response = {response}")
            logging.debug(f"response.status_code = {response.status_code}")
            if response.text:
                return response.json(), response.status_code
            return None, response.status_code
        except Exception as error:
            logging.error(f"Error in POST API request: {error}")
            raise error

    @staticmethod
    def post_v1(route, data=None, json=None, headers=None):
        try:
            url = route
            logging.info("POST V1 request sent")
            logging.debug(f"url = {url}, data = {data}")
            response = requests.post(url, data=data, json=json, headers=headers)
            logging.debug(
                f"response.text = {response.text}, response.status_code = {response.status_code}"
            )
            if response.text:
                return response.text, response.status_code
            return None, response.status_code
        except Exception as error:
            logging.error(f"Error in post_v1 API request: {error}")
            raise error

    @staticmethod
    def get(route, params=None, data=None, headers=None):
        try:
            url = route
            logging.info("GET request sent")
            logging.debug(f"{url=}, {params=},{data=}")
            response = requests.get(url, params=params, data=data, headers=headers)
            if response.status_code >= 400:
                raise Exception(
                    f"Call to {route} failed with {response.status_code} and response {response.text}"
                )
            return json.loads(response.text), response.status_code
        except Exception as error:
            logging.error(f"Error in GET API request: {error}")

    @staticmethod
    def put(route, data=None, headers=None):
        try:
            url = route
            logging.info("PUT request sent")
            logging.debug(f"url = {url}, data = {data}")
            response = requests.put(url, json=data, headers=headers)
            if response.status_code >= 400:
                raise Exception(
                    f"Call to {route} failed with {response.status_code} and response {response.text}"
                )
            return json.loads(response.text), response.status_code
        except Exception as error:
            logging.error(f"Error in PUT API request: {error}")

    @staticmethod
    def delete(route, headers=None):
        try:
            url = route
            logging.info("DELETE request sent")
            logging.debug(f"url = {url}")
            response = requests.delete(url, headers=headers)
            if response.status_code >= 400:
                raise Exception(
                    f"Call to {route} failed with {response.status_code} and response {response.text}"
                )
            return response.status_code
        except Exception as error:
            logging.error(f"Error in DELETE API request: {error}")

    @staticmethod
    def get_bytes(route, params=None, data=None, headers=None):
        try:
            url = route
            logging.info("get_bytes request sent")
            logging.debug(f"{url=}, {params=},{data=}")
            response = requests.get(url, params=params, data=data, headers=headers)
            return response.content, response.status_code
        except Exception as error:
            logging.error(f"Error in get_bytes API request: {error}")

    @staticmethod
    def post_with_params(route, params=None, headers=None, data=None):
        try:
            url = route
            logging.info("POST request sent")
            logging.debug(f"url = {url}, params = {params}, data = {data}")
            response = requests.post(url, data=data, params=params, headers=headers)
            logging.debug(
                f"response.text = {response.text}, response.status_code = {response.status_code}"
            )
            if response.text:
                return json.loads(response.text), response.status_code
            return None, response.status_code
        except Exception as error:
            logging.error(f"Error in post_with_params request: {error}")
            raise error

    @staticmethod
    def download_file(route, params=None, headers=None):
        try:
            url = route
            logging.info("GET request to download file sent")
            logging.debug(f"url = {url}, params = {params}")
            response = requests.get(url, params=params, headers=headers)
            if response.status_code >= 400:
                raise Exception(
                    f"Call to {route} failed with {response.status_code} and response {response.text}"
                )
            return response.content, response.status_code
        except Exception as error:
            logging.error(f"Error in download_file request: {error}")
            raise error
