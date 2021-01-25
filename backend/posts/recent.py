import requests
import json

class Recent:
    entity = None
    bearer_token = None

    # def __init__(self, entity, bearer_token):
    #     self.entity = entity
    #     self.bearer_token = bearer_token

    def __create_headers(self, bearer_token):
        headers = {"Authorization": "Bearer {}".format(bearer_token)}
        return headers

    def get_query(self):
        url = "https://api.twitter.com/2/tweets/search/recent?query=entity:" + self.entity + " lang:en&max_results=100&tweet.fields=created_at"
        headers = self.__create_headers(self.bearer_token)
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise Exception(
                "Cannot get stream (HTTP {}): {}".format(
                    response.status_code, response.text
                )
            )
        return response.json()