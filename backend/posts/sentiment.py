import json
from textblob import TextBlob

class Sentiment():
    data = None
    def analyze(self):
        twit = self.data
        if isinstance(twit, list):
            twit = TextBlob(" ".join(twit))
        
        twit = TextBlob(str(twit))

        # determine if sentiment is positive, negative, or neutral
        # if tweet.sentiment.polarity < 0:
        #     sentiment = "negative"
        # elif tweet.sentiment.polarity == 0:
        #     sentiment = "neutral"
        # else:
        #     sentiment = "positive"

        # print(twit.sentiment)

        return(str("{:.2f}".format(twit.sentiment.polarity)))