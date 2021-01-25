import requests

class Stream:
    bearer_token = None

    def __init__(self, bearer_token):
        self.bearer_token = bearer_token


    def __create_headers(self, bearer_token):
        headers = {"Authorization": "Bearer {}".format(bearer_token)}
        return headers


    def __get_rules(self, headers, bearer_token):
        response = requests.get(
            "https://api.twitter.com/2/tweets/search/stream/rules", headers=headers
        )
        if response.status_code != 200:
            raise Exception(
                "Cannot get rules (HTTP {}): {}".format(response.status_code, response.text)
            )
        print(json.dumps(response.json()))
        return response.json()


    def __delete_all_rules(self, headers, bearer_token, rules):
        if rules is None or "data" not in rules:
            return None

        ids = list(map(lambda rule: rule["id"], rules["data"]))
        payload = {"delete": {"ids": ids}}
        response = requests.post(
            "https://api.twitter.com/2/tweets/search/stream/rules",
            headers=headers,
            json=payload
        )
        if response.status_code != 200:
            raise Exception(
                "Cannot delete rules (HTTP {}): {}".format(
                    response.status_code, response.text
                )
            )
        print(json.dumps(response.json()))


    def __set_rules(self, headers, delete, bearer_token):
        # You can adjust the rules if needed
        sample_rules = [
            {"value": "azerbaijan"},
        ]
        payload = {"add": sample_rules}
        response = requests.post(
            "https://api.twitter.com/2/tweets/search/stream/rules",
            headers=headers,
            json=payload,
        )
        if response.status_code != 201:
            raise Exception(
                "Cannot add rules (HTTP {}): {}".format(response.status_code, response.text)
            )
        print(json.dumps(response.json()))


    def __get_stream(self, headers, set, bearer_token):
        response = requests.get(
            "https://api.twitter.com/2/tweets/search/stream", headers=headers, stream=True,
        )
        print(response.status_code)
        if response.status_code != 200:
            raise Exception(
                "Cannot get stream (HTTP {}): {}".format(
                    response.status_code, response.text
                )
            )
        for response_line in response.iter_lines():
            if response_line:
                json_response = json.loads(response_line)
                return json.dumps(json_response, indent=4, sort_keys=True)


    def stream(self):
        headers = self.__create_headers(self.bearer_token)
        rules = self.__get_rules(headers, self.bearer_token)
        delete = self.__delete_all_rules(headers, self.bearer_token, rules)
        set = self.__set_rules(headers, delete, self.bearer_token)
        return self.__get_stream(headers, set, self.bearer_token)
