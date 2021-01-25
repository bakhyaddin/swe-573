from wordcloud import WordCloud, STOPWORDS

class WordCloud:
    data = None
    __stopwords = set(STOPWORDS)

    def get_word_cloud(self):
        wordcloud = WordCloud(width = 800, height = 300, 
                        stopwords = self.__stopwords, background_color ='white',  min_font_size = 10)
        return wordcloud.generate(" ".join(self.data))