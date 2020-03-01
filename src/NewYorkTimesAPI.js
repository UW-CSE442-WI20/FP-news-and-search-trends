// nytd_geo for a location
// nytd_per for a person
// nytd_org for an organization
// nytd_des for a descriptor
// nytd_ttl for a creative work title
// nytd_topic for a topic
// nytd_prog for a public company

class NYT {
    constructor() {
        BaseURI = 'http://api.nytimes.com/svc/semantic/v2/concept'
        APIKey = 'z2V5MRAGB9GFVaeIIHq5iSHRGULe0w2Q'
    }

    static get location() {
        return 'nytd_geo';
    }

    static get person() {
        return 'nytd_per';
    }

    static get organization() {
        return 'nytd_org';
    }

    static get descriptor() {
        return 'nytd_des';
    }

    static get title() {
        return 'nytd_ttl';
    }

    static get topic() {
        return 'nytd_topic';
    }

    static get company() {
        return 'nytd_prog';
    }

    nameQuery(conceptType, specificConcept, params = '') {
        if (params === '') {
            return BaseURI + '/name/' + conceptType + '/' + specificConcept + '.json?fields=all&api-key=' + APIKey;
        } else {
            return BaseURI + '/name/' + conceptType + '/' + specificConcept + '.json?fields=' + params + '&api-key=' + APIKey;
        }
    }

    searchQuery(queryTerm, params = '') {
        if (params === '') {
            return BaseURI + '/search.json?query=' + queryTerm + '&api-key=' + APIKey;
        } else {
            return BaseURI + '/search.json?query=' + queryTerm + '&concept_type=' + params + '&api-key=' + APIKey;
        }
    }


    articleSearch(queryTerm) {
        return 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + queryTerm + '&api-key=' + APIKey;
    }

}



module.exports = NYT;


