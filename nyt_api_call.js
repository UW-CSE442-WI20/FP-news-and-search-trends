const d3 = require('d3');
const BaseURI = 'http://api.nytimes.com/svc/semantic/v2/concept'
const APIKey = ''

// nytd_geo for a location
// nytd_per for a person
// nytd_org for an organization
// nytd_des for a descriptor
// nytd_ttl for a creative work title
// nytd_topic for a topic
// nytd_prog for a public company
const conceptType = Object.freeze({'location':'nytd_geo',
                                   'person':'nytd_per',
                                   'organization':'nytd_org',
                                   'descriptor':'nytd_des',
                                   'title':'nytd_ttl',
                                   'topic':'nytd_topic',
                                   'company':'nytd_prog'})

function nameQuery(conceptType, specificConcept, params='') {
    if (params === '') {
        return BaseURI + '/name/' + conceptType + '/' + specificConcept + '.json?fields=all&api-key=' + APIKey
    } else {
        return BaseURI + '/name/' + conceptType + '/' + specificConcept + '.json?fields=' + params + '&api-key=' + APIKey
    }
}

function searchQuery(queryTerm, params='') {
    if (params === '') {
        return BaseURI + '/search.json?query=' + queryTerm + '&api-key=' + APIKey
    } else {
        return BaseURI + '/search.json?query=' + queryTerm + '&concept_type=' + params + '&api-key=' + APIKey
    }
}

d3.json(nameQuery(conceptType.descriptor, 'hate crimes'))
    .then((data) => {
        console.log(data)
    });


