from wordcloud import WordCloud, STOPWORDS
import io
import matplotlib.pyplot as plt

class GenerateWordCloud:
    data = None
    __stopwords = set(STOPWORDS)

    def __convert_to_bytes(self, wordcloud):
        buf = io.BytesIO()
        plt.figure(figsize=(40, 30))
        plt.imshow(wordcloud)
        plt.axis("off")
        plt.savefig(buf, format='png', bbox_inches='tight')
        image_bytes = buf.getvalue()
        buf.close()
        plt.close()
        return image_bytes


    def get_word_cloud(self):
        wordcloud = WordCloud(width = 800, height = 300, 
                        stopwords = self.__stopwords, background_color ='black', colormap='Set2', collocations=False, min_font_size = 10)
        wordcloud.generate(str(" ".join(self.data)))

        return self.__convert_to_bytes(wordcloud)