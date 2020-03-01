
import json
import requests
import os
import re

def create_result_json():
    res = dict()
    for topic in topics:
        articles = {
            'topic': topic,
            'articles': []
        }
        res[topic] = articles
    return res

def handle_article(article, headline, keywords):
    for word in keywords:
        matches = 0
        for key in ['abstract', 'snippet', 'lead_paragraph']:
            if key in article and re.search(word, article[key], re.IGNORECASE):
                matches += 1

        if headline and re.search(word, headline, re.IGNORECASE):
            matches += 1

        if matches == 0:
            return None
    return article

topics = {
    'Area_51_raid': ['area', '51', 'raid'],
    'Baby_Yoda': ['baby', 'yoda'],
    'Boeing_737_crashes': ['Boeing', '737', 'MAX'],
    'California_earthquake': ['California', 'earthquake'],
    'California_wildfire': ['California', 'wildfire'],
    'Christchurch_shooting': ['christchurch', 'shooting'],
    'Coco_Gauff': ['coco', 'gauff'],
    'College_Football_Playoff': ['college', 'football', 'playoff'],
    'Dayton_shooting': ['Dayton', 'shooting'],
    'El_Paso_shooting': ['El Paso', 'shooting'],
    'Equifax_data_breach': ['Equifax'],
    'FIFA_Women\'s_World_Cup': ['FIFA', 'Women', 'World', 'Cup'],
    'Greta_Thunberg': ['Greta', 'Thunberg'],
    'Hurrican_Dorian': ['Hurricane', 'Dorian'],
    'Katelyn_Ohashi': ['Katelyn', 'Ohashi'],
    'Lori_Loughlin_college_scandal': ['Lori', 'Loughlin'],
    'MLS_Cup': ['M\.L\.S.', 'cup'],
    'Muller_Report': ['Mueller', 'Report'],
    'NCAA_Men\'s_Division_I_Basketball_Tournament': ['N\.C\.A\.A\.', 'basketball', 'tournament'],
    'Notre_Dame_fire': ['Notre', 'dame', 'fire'],
    'Stanley_Cup': ['Stanley', 'cup'],
    'Super_Bowl_LIII': ['Super', 'Bowl', 'Patriots', 'Rams'],
    'The_NBA_Finals': ['Finals', 'raptors', 'warriors'],
    'Tiger_Woods_Masters': ['Tiger', 'woods', 'masters'],
    'Trump_impeachment': ['Trump', 'impeachment'],
    'World_Series': ['World', 'series', 'nationals', 'astros'],
    'government_shutdown': ['government', 'shutdown'],
    'vaping': ['vaping']
}

articles = create_result_json()

seen_articles = set()
for i in range(0, 12):
    fname = '%02d-2019-archive.json' % (i + 1)
    print(fname)

    with open(fname, 'r') as infile:
        data = json.load(infile)

    docs = data['response']['docs']
    for article in docs:
        headline = article['headline']['main']
        if headline not in seen_articles:
            seen_articles.add(headline)
            for topic in topics:
                if handle_article(article, headline, topics[topic]):
                    # print("topic: %s, headline: %s" % (topic, headline))
                    articles[topic]['articles'].append(article)


for topic in topics:
    with open('NYT_%s.json' % articles[topic]['topic'], 'w') as outfile:
        #articles_json = json.dumps()
        json.dump(articles[topic], outfile)













# i = 1
# name = '%02d-2019-archive.json' % (i + 1)

# with open(name) as json_file:
#     data = json.load(json_file)
#     for p in data['people']:
#         print('Name: ' + p['name'])
#         print('Website: ' + p['website'])
#         print('From: ' + p['from'])
#         print('')

# for i in range(12):
#     URL = 'https://api.nytimes.com/svc/archive/v1/2019/%s.json?api-key=z2V5MRAGB9GFVaeIIHq5iSHRGULe0w2Q' % str(i + 1)
#     print(str(i + 1))
#     r = requests.get(url=URL)
#     data = r.json()

#     name = '%02d-2019-archive.json' % (i + 1)
#     print(name)
#     with open(name, 'w') as outfile:
#         json.dump(data, outfile)


def traverse_csvs():
    path = '../static/news_topics_2019'
    for filename in os.listdir(path):
        filename = path + '/' + filename
        print(filename)


api_key = 'z2V5MRAGB9GFVaeIIHq5iSHRGULe0w2Q'


def article_search(query, field_name='pub_date', field_arg='2019'):
    filt = '&fq=' if field_name else ''
    return 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=%s%s%s:("%s")&api-key=%s' % \
        (query, filt, field_name, field_arg, api_key)


def semantic_search_name(concept_type, concept_name):
    base = 'http://api.nytimes.com/svc/semantic/v2/concept/name'
    URI = '%s/%s/%s.json?fields=all&api-key=%s' % (
        base, concept_type, concept_name, api_key)
    return URI


def semantic_search_search(concept_type, concept_name):
    base = 'http://api.nytimes.com/svc/semantic/v2/concept/search.json?query='
    URI = '%s%s&concept_type=%s&api-key=%s' % (
        base, concept_name, concept_type, api_key)
    print(URI)
    return URI
