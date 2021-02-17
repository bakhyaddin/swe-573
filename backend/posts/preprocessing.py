from django.core.validators import URLValidator
from textblob import TextBlob, Word
import emoji
import nltk
nltk.download('punkt')
nltk.download('wordnet')

class CleanData:
    validator = URLValidator()
    stopwords = ['i', "i'm", "it's", 'me', 'my', 'myself', 'we', "we're", 'our', 'ours', 'ourselves',
        "you're", "mine", "we're", "i've", "u've", "u're", "he's", "they're", "they've", "have't",
        'you', "you're", "you've", "u", "y", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 
        'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 
        'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 
        'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
        'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 
        'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 
        'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 
        'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 
        'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 
        'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 
        'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 
        'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', 
        "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 
        'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't", "rt", " ", "what’s", "what is", "that", "this", 
        "those", "these", "oh", "lol.", "lol", "that's", "this's"]

    chars = [ ".", "," , "!", "@", "ˆ", "&", "*", "(", ")", "_", "-", "=", "+", "…", "?", ' " ', " ' ", ";", ":", "‘"]
 


    def __tokenize_words(self, sentence):
        return sentence.split(" ")


    def __clean_from_emojis(self, word):
        word_without_emoji = ""

        for letter in word:
            if letter not in emoji.UNICODE_EMOJI:
                word_without_emoji += letter
        return word_without_emoji

    
    def __clean_from_chars(self, word):
        word_without_chars = ""

        for letter in word:
            if letter not in self.chars:
                word_without_chars += letter

        return word_without_chars


    def __is_retwit_word(self, word, word_index):
        if word_index == 1 and word[0] == "@":
            return True


    def __is_word_url(self, word):
        try:
            self.validator(word)
            return True
        except:
            return False


    def __proper_word(self, word, words):
        word_index = words.index(word)

        is_retwit_word = self.__is_retwit_word(word, word_index)
        is_word_url = self.__is_word_url(word)

        if not is_retwit_word and not is_word_url:
            return self.__clean_from_emojis(self.__clean_from_chars(word))
            

    def clean_data(self, sentence):
        words_filtered = []
        words = self.__tokenize_words(sentence)

        for w in words:
            proper_word = self.__proper_word(w, words)

            if proper_word and proper_word.lower() not in self.stopwords:
                # lemmatize words at the same time
                words_filtered.append(Word(proper_word.lower()).lemmatize())
        
        return " ".join(words_filtered)