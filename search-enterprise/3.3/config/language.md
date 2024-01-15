---
title: Language support
---

Search Enterprise supports multiple languages. You can configure other languages using the `src/main/resources/alfresco/search/elasticsearch/config/locale` configuration file.

> **Note:** Some supported languages require the installation of a plug-in and some Asian languages may also require installation of the [ICU analysis plug-in](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html){:target="_blank"} Where there is a plug-in required, you must install it on every node in the cluster.

The following languages are supported:

| Language | Search Enterprise language | Plug-in required |
|--------|-----------|
| fr | light_french | Not required |
| de | light_german | Not required |
| it | light_italian | Not required |
| es | light_spanish | Not required |
| nl | dutch | Not required |
| pl | polish | [Stempel Polish analysis plug-in](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-stempel.html){:target="_blank"}. |
| ja | japanese | [Japanese (kuromoji) analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-kuromoji.html){:target="_blank"} and [ICU analysis plug-in](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html){:target="_blank"}. |
| ru | russian | Not required |
| pt | light_Portugese | Not required |
| zh | simplified Chinese | [Smart Chinese analysis plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-smartcn.html){:target="_blank"} and [ICU analysis plug-in](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html){:target="_blank"}. |
| cs | czech | Not required |
| da | danish | Not required |
| sv | swedish | Not required |
| fi | finnish | Not required |
| nb | norwegian | Not required |

## Add language

You must update the Content Services `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` configuration file to enable the language you want to use with Search Enterprise. For example to use French you must add `-Delasticsearch.index.locale=fr`, and `-Dfile.encoding=utf-8`.

### Docker Compose

If you are installing Search Enterprise using a Docker Compose file you must instruct Alfresco that you are using another language in addition to English. For example, to use French you must add the following environment variable to the Alfresco service (`alfresco`):

```yml
JAVA_OPTS: "
  -Delasticsearch.index.locale=fr
"
```

You must also instruct Alfresco and Search Enterprise to use `UTF-8` encoding. This applies to the Alfresco service as well as the Elasticsearch live-indexing and Full-indexing services:

```yml
JAVA_OPTS: "
  -Dfile.encoding=utf-8
"
```

## Custom configuration

To create a custom configuration you must create a `JSON` file in the locale configuration directory: `src/main/resources/alfresco/search/elasticsearch/config/locale`. The file must follow the naming convention of `xx_locale.json` where `xx` is the two character locale code. Use the following code example to create your own configuration file. In this case the example is for the French language.

```json
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
```

The `analysis` section contains three analyzers and any custom defined filters. Each analyzer section must contain at least one tokenizer. You can optionally include a number of filters which can then modify the tokens, for example to convert text to lowercase for the index. `locale_content` is a symmetric content analyzer, which in this example is set to `french`. `locale_text_index` is an asymmetric text analyzer, which is set to use whitespace as the delimiter, and has several filters including a custom defined filter, in this case called `french_stemmer`.
The `locale_text_query` section contains an asymmetric text query analyzer which is also set to use whitespace as the delimiter. It has several filters, including, in this case, one called `french_stemmer`.
The `filter` section contains any custom defined filters that are to be used by the analyzers. In this case the filter is called `french_stemmer`.

## Checking configuration

You can check your language configuration.

To verify that the index was created using the correct locale configuration:

`curl -s '{$hostname}:9200/alfresco/_settings/' | jq `

To check how your text is split into tokens:

`curl -X GET "{$hostname}:9200/alfresco/_analyze?pretty" -H 'Content-Type: application/json' -d'{"analyzer" : "locale_content", "text" : "I found a dog."}'`

> **Note:** For a new environment ensure that the initial reindexing is run first.

To verify that the content of a particular node has been correctly extracted and stored in the index:

`curl -s {$hostname}:9200/alfresco/_doc/{$nodeId} | jq ._source`

To execute  a search query:

`curl -s -u admin:admin --header "Content-Type: application/json" -d '{"query":{"query":"dog","language":"afts"}}' "{$hostname}:8080/alfresco/api/-default-/public/search/versions/1/search" | jq .list.entries`
