import json
from textblob import TextBlob

class Sentiment():
    data = None
    def analyze(self):
        tweet = TextBlob(" ".join(self.data))

        # wordcloud.data = tweet
        # wordcloud.get_word_cloud()

        # determine if sentiment is positive, negative, or neutral
        if tweet.sentiment.polarity < 0:
            sentiment = "negative"
        elif tweet.sentiment.polarity == 0:
            sentiment = "neutral"
        else:
            sentiment = "positive"

        print(tweet.sentiment.polarity, sentiment)