from textblob import TextBlob
from nltk import bigrams
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

import networkx as nx
import itertools
import collections
import numpy
import io

import urllib

class NGram():
    data = None

    def get_bigram(self):
        terms_bigram = [list(bigrams(twit.split(" "))) for twit in self.data]
        bigram = list(itertools.chain(*terms_bigram))
        bigram_counts = collections.Counter(bigram).most_common(20)

        G = nx.Graph()

        all_weights = [v for k, v in bigram_counts]
        maxmimum = max(all_weights)
        minimum = min(all_weights)
        s = sum(all_weights)

        # std = numpy.std(all_weights)
        # mean = numpy.mean(all_weights)

        # train3['SalePrice']-train3['SalePrice'].mean())/train3['SalePrice'].std()



        for k, v in bigram_counts:
            weight = (9 * ((v - minimum)/(maxmimum - minimum))) + 1
            print(weight)
            G.add_edge(k[0], k[1], weight=weight)

        edges = G.edges()
        weights = [G[u][v]['weight'] for u,v in edges]

        fig, ax = plt.subplots(figsize=(10, 8))
        ax.axis('off')

        pos = nx.spring_layout(G, k=2)

        nx.draw_networkx(G, pos,
                        font_size=13,
                        node_color='#1D3357',
                        width=weights,
                        edge_color='#72E2B2',
                        with_labels = False,
                        ax=ax)

        # Create offset labels
        for key, value in pos.items():
            x, y = value[0]+.135, value[1]+.045
            ax.text(x, y,
                    s=key,
                    # bbox=dict(facecolor='red', alpha=0.25),
                    horizontalalignment='center', fontsize=8)
            
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        image_bytes = buf.getvalue()
        buf.close()
        plt.close()

        return image_bytes