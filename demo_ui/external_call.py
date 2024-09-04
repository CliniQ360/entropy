import requests
import json


class APIInterface:
    @staticmethod
    def post(route, data=None, headers=None):
        """
        Send a POST request to the specified route with optional data and headers.

        Args:
            route (str): The URL or route to send the request to.
            data (dict, optional): The data to send with the request. Defaults to None.
            headers (dict, optional): The headers to include with the request. Defaults to None.

        Returns:
            tuple: A tuple containing the parsed JSON response and the status code of the response.

        Raises:
            Exception: If the request fails with a status code of 400 or higher.
        """
        url = route
        print(f"url = {url}, data = {data}")
        response = requests.post(url, json=data, headers=headers)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return json.loads(response.text), response.status_code

    @staticmethod
    def post_form(route, data=None, headers=None):
        url = route
        print(f"url = {url}, data = {data}")
        response = requests.post(url, data=data, headers=headers)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return json.loads(response.text), response.status_code

    @staticmethod
    def post_with_params(route, files=None, params=None, headers=None):
        url = route
        print(f"url = {url}")
        response = requests.post(url, params=params, headers=headers, files=files)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return json.loads(response.text), response.status_code

    @staticmethod
    def get(route, params=None, headers=None):
        url = route
        print(f"url = {url}, params = {params}")
        response = requests.get(url, params=params, headers=headers)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return json.loads(response.text), response.status_code

    @staticmethod
    def get_raw(route, params=None, headers=None):
        url = route
        print(f"url = {url}, params = {params}")
        response = requests.get(url, params=params, headers=headers)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return response.text

    @staticmethod
    def put(route, data=None, headers=None):
        url = route
        print(f"url = {url}, data = {data}")
        response = requests.put(url, json=data, headers=headers)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return json.loads(response.text), response.status_code

    @staticmethod
    def delete(route, headers=None):
        url = route
        print(f"url = {url}")
        response = requests.delete(url, headers=headers)
        if response.status_code >= 400:
            raise Exception(
                f"Call to {route} failed with {response.status_code} and response {response.text}"
            )
        return response.status_code
