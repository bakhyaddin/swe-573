from textblob import TextBlob
from nltk import bigrams
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

import networkx as nx
import itertools
import collections

import io

import urllib, base64

class NGram():
    data = None

    def get_bigram(self):
        terms_bigram = [list(bigrams(tweet.split(" "))) for tweet in self.data]
        bigram = list(itertools.chain(*terms_bigram))
        bigram_counts = collections.Counter(bigram)
        bigram_counts.most_common(20)


        G = nx.Graph()
        # Create connections between nodes
        for k, v in bigram_counts.items():
            G.add_edge(k[0], k[1], weight=(v * 10))

        fig, ax = plt.subplots(figsize=(10, 8))

        pos = nx.spring_layout(G, k=2)

        # Plot networks
        nx.draw_networkx(G, pos,
                        font_size=16,
                        width=3,
                        edge_color='grey',
                        node_color='purple',
                        with_labels = False,
                        ax=ax)

        # Create offset labels
        for key, value in pos.items():
            x, y = value[0]+.135, value[1]+.045
            ax.text(x, y,
                    s=key,
                    bbox=dict(facecolor='red', alpha=0.25),
                    horizontalalignment='center', fontsize=13)
            
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        image_bytes = buf.getvalue()
        buf.close()
        plt.close()

        return image_bytes