---
title: Multiple language support
---

Search Enterprise supports multiple language. The support is provided using a JSON configuration files located in the alfresco-enterprise-repo at `src/main/resources/alfresco/search/elasticsearch/config/locale`.

The configuration files are intended to provide a basic configuration which the customer can adjust and customise as necessary. 

Configuration files are provided for the following languages:

| language | Search Enterprise language | Plug in required |
|--------|-----------|
  | fr |  light_french | Not required |

  | de |  light_german | Not required |

  | it | light_italian | Not required |

  | es |  light_spanish | Not required |

  | nl | Dutch  | Not required |

  | pl | Polish  | [Stempel Polish analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-stempel.html) |

  | ja |  Japanese | [Japanese (kuromoji) analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-kuromoji.html) and [ICU analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html) |

  | ru | Russian  | Not required |

  | pt | light_Portugese  | Not required |

  | zh | Simplified Chinese  | [Smart Chinese analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-smartcn.html) and [ICU analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html) |

  | cs | Czech  | Not required |

  | da |  Danish | Not required |

  | sv | Swedish   | Not required |

  | fi | Finnish   | Not required |

  | nb | Norwegian  | Not required |

To use the configuration for a specific locale, set the Java options elasticsearch locale in the docker-compose file for the alfresco service environment, for example:

```java
JAVA_OPTS: "
  -Delasticsearch.index.locale=fr
"
```

You may also need to set the file encoding to `UTF-8`. This applies to alfresco service environment as well as the elasticsearch live-indexing and full-indexing services:

```java
JAVA_OPTS: "
  -Dfile.encoding=utf-8
"
```

Some supported languages also require installation of a plug-in. Note that Asian languages may additionally require installation of the analysis-icu plug-in.

A list of ElasticSearch analysis plug-ins can be found here.

How to provide a custom configuration
Add a custom configuration JSON file to the locale configuration directory src/main/resources/alfresco/search/elasticsearch/config/locale, following the naming convention of xx_locale.json where xx is the two character locale code. 

Below is a sample JSON configuration file for the French language:

```JSON
{
  "settings": {
    "analysis": {
      "analyzer": {
        "locale_content": {
          "type": "french"        },
        "locale_text_index": {
          "tokenizer": "whitespace",
          "filter": [
            "asciifolding",
            "custom_word_delimiter_graph",
            "lowercase",
            "flatten_graph",
            "french_stemmer"          ]
        },
        "locale_text_query": {
          "tokenizer": "whitespace",
          "filter": [
            "asciifolding",
            "custom_word_delimiter_graph",
            "lowercase",
            "french_stemmer"          ]
        }
      },
      "filter": {
        "french_stemmer": {
          "type": "stemmer",
          "language": "light_french"        }
      }
    }
  }
}

The Analysis section contains 3 analyzers and any custom defined filters. Every analyzer must contain at least one tokenizer, and can optionally include a number of filters which can then modify the tokens, such as the direction to convert text to lowercase for the index.

locale_content is a symmetric content analyzer, which in this example is set to french.

locale_text_index is an asymmetric text analyzer, which is set to use whitespace as the delimiter, and has several filters including a custom defined filter french_stemmer

locale_text_query is an asymmetric text query analyzer, which is also set to use whitespace as the delimiter, and has several filters including the custom defined filter french_stemmer

The filter section at the end of the analysis section contains any custom defined filters to be used by the analyzers. In this case the filter is the stemmer french_stemmer. 

Finally, follow the steps above in "How to use a language other than English" to ensure the correct locale is selected.

Checking a configuration
To verify that the index was created using the locale configuration settings:


`curl -s '{$hostname}:9200/alfresco/_settings/' | jq `

To check how text is split into tokens:

`curl -X GET "{$hostname}:9200/alfresco/_analyze?pretty" -H 'Content-Type: application/json' -d'{"analyzer" : "locale_content", "text" : "I found a dog."}'`

For a new environment ensure that the initial reindexing has been run.

To verify that the content of a particular node has been correctly extracted and stored in the index:

`curl -s {$hostname}:9200/alfresco/_doc/{$nodeId} | jq ._source`

To execute  a search query:

`curl -s -u admin:admin --header "Content-Type: application/json" -d '{"query":{"query":"dog","language":"afts"}}' "{$hostname}:8080/alfresco/api/-default-/public/search/versions/1/search" | jq .list.entries`