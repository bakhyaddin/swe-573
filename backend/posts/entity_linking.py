import spacy
spacy.load("knowledge_base")
from SpacyEntityLinker import EntityLinker

entityLinker = EntityLinker()
nlp = spacy.load("en_core_web_sm")
nlp.add_pipe(entityLinker, last=True, name="entityLinker")

class EntityLinking():
    data = None

    def get_entites(self):

        doc = nlp(" ".join(self.data))

        #returns all entities in the whole document
        all_linked_entities=doc._.linkedEntities
        #iterates over sentences and prints linked entities
        for sent in doc.sents:
            sent._.linkedEntities.pretty_print()