---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Finding content by a search query

Use a search query to be able to do a more specific search, such as where to search and for what.

|API Call|POST search|
|--------|-----------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/search/search](http://localhost:8080/api-explorer/#!/search/search)|
|See also|[Simple search](dev-api-by-language-alf-rest-finding-content-by-term.md)|
|Search Reference|[Alfresco Full Text Search Reference \(afts\)](rm-searchsyntax-intro.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

## Introduction

If the pre-canned queries \(i.e. term based search\) do not provide what you need you have the option to use the rich and powerful `/search` API, at the cost of a little more complexity. Due to the number of options and functionality available via the search API, it is a little different than most of the other search APIs. Firstly, the API is defined under the "search" namespace so it's base URL is slightly different. Secondly, the `/search` endpoint does not accept any query parameters and is therefore completely controlled via the POST body as we'll see in the examples that follow.

## Searching text content

You POST a search query to the following URL:

**http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search**

The POST body for a basic query looks like:

```
{
  "query": {
    "query": "dog"
  }
}
```

This basic query searches only the text content for the files in the repository. Let’s say I got a file with the word dog in the text and another file with the word dog in the `cm:title` property. If I search with the following query I should only get one response:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{
  "query": {
    "query": "dog"
  }
}
' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   711  100   671  100    40  23137   1379 --:--:-- --:--:-- --:--:-- 24517
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "context": {},
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-09-16T08:31:22.936+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 48,
            "encoding": "ISO-8859-1"
          },
          "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d",
          "createdAt": "2019-09-05T08:52:16.785+0000",
          "isFolder": false,
          "search": {
            "score": 3.5323858
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "somefile.txt",
          "location": "nodes",
          "id": "8f1c3f76-0eaf-452a-be66-c5405af67dbc"
        }
      }
    ]
  }
}
```

The response contains only minimal metadata for each `entry`. Use the `include` and `fields` parameters to return more metadata in the response.

The results should look familiar, for the most part they are the same as the results from `/queries` and from `/nodes/{id}/children`.

There are a couple of differences though, the search API returns two additional properties, `search` and `location`. The `search` property adds extra context for the individual result, in this case, the `score`. Explaining the full details is beyond the scope of this article but it is possible to search across "live" nodes, deleted nodes and versioned nodes, the `location` property shows from which area the result came from. By default only "live" nodes are included.

The example above used the default search language `afts` \(Alfresco Full Text Search\), however, `cmis` and `lucene` are also supported.

## CMIS query finding files by name

The example body below shows how to define a simple CMIS query to find all files with a name starting with "test":

```
{
  "query": {
    "query": "select * from cmis:document WHERE cmis:name LIKE 'test%'",
    "language": "cmis"
  }
}
```

Here is how the call looks like, I have stored the query JSON data in a file called cmis-query.json \(it does not work to write the query with the `-d` curl parameter on the command line\):

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@cmis-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1329    0  1212  100   117  15150   1462 --:--:-- --:--:-- --:--:-- 16822
{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-03T08:37:17.832+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "application/x-javascript",
            "mimeTypeName": "JavaScript",
            "sizeInBytes": 118,
            "encoding": "UTF-8"
          },
          "parentId": "fa62d870-061c-400f-a3c5-12a37fe0738e",
          "createdAt": "2019-10-03T08:37:17.832+0000",
          "isFolder": false,
          "search": {
            "score": 1
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test return value.js.sample",
          "location": "nodes",
          "id": "6b0b7a4c-1630-47ec-9c2f-7620c1cefeed"
        }
      },
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-11-07T10:43:43.279+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 9,
            "encoding": "UTF-8"
          },
          "parentId": "6b661ba4-830b-457d-af04-46f174351536",
          "createdAt": "2019-11-07T10:43:43.279+0000",
          "isFolder": false,
          "search": {
            "score": 1
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test-file.txt",
          "location": "nodes",
          "id": "9613e418-b1c1-4889-8866-4dccda66a258"
        }
      }
    ]
  }
}
```

## Lucene query finding files modified last week

The example body below shows how to execute a simple Lucene query to find all the files modified in the last week:

```
{
  "query": {
    "query": "+@cm\\:modified:[NOW/DAY-7DAYS TO NOW/DAY+1DAY] +TYPE:\"cm:content\"",
    "language": "lucene"
  }
}
```

Here is how the call looks like, I have stored the query JSON data in a file called lucene-query.json:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@lucene-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   829    0   698  100   131   7050   1323 --:--:-- --:--:-- --:--:--  8373
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "context": {
      "consistency": {
        "lastTxId": 139
      }
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-11-07T10:43:43.279+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 9,
            "encoding": "UTF-8"
          },
          "parentId": "6b661ba4-830b-457d-af04-46f174351536",
          "createdAt": "2019-11-07T10:43:43.279+0000",
          "isFolder": false,
          "search": {
            "score": 0.017988352
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test-file.txt",
          "location": "nodes",
          "id": "9613e418-b1c1-4889-8866-4dccda66a258"
        }
      }
    ]
  }
}
```

## Searching by content type and controlling paging and sorting

As with all the v1 ReST APIs paging can also be controlled, it's just done via the body rather than a query parameter. The results can also be sorted. The example body below shows how to execute a search to find all files ordered by the `cm:name` property, only show 25 results rather than the default of 100 and skip the first 10 results:

```
{
  "query": {
    "query": "+TYPE:\"cm:content\"",
    "language": "afts"
  },
  "paging": {
    "maxItems": "25",
    "skipCount": "10"
  },
  "sort": [{"type":"FIELD", "field":"cm:name", "ascending":"false"}]
}
```

This also shows how you can search for a specific content type with the `TYPE` keyword.

Here is how the call looks like, I have stored the query JSON data in a file called paging-sort-query.json:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@paging-sort-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 13836    0 13622  100   214  31387    493 --:--:-- --:--:-- --:--:-- 31880
{
  "list": {
    "pagination": {
      "count": 25,
      "hasMoreItems": true,
      "skipCount": 10,
      "maxItems": 25
    },
    "entries": [
      {
        "entry": {
...        "name": "WebSiteReview.mp4",
...        }
      },
      {
        "entry": {
...          "name": "turbine.JPG",
...        }
      },
      {
        "entry": {
...          "name": "translatable.ftl",
...        }
      },
      {
        "entry": {
...          "name": "text-file.txt",
...        }
      },
      {
...          "name": "test return value.js.sample",
...        }
      },
      {
        "entry": {
...          "name": "test-file.txt",
...        }
      },
      {
...          "name": "system-overview.html",
...        }
      },
      {
        "entry": {
...          "name": "start-pooled-review-workflow.js",
...        }
      },
      {
        "entry": {
...          "name": "some-stuff.txt",
...        }
      },
      {
        "entry": {
...          "name": "somefile.txt",
...        }
      },
 ...
    ]
  }
}
```

The result have been truncated a bit here for clarity.

## Searching by aspect

Another common search requirement is to find files that have a certain aspect applied. We can do that by using the `ASPECT` keyword in a similar way to how we used the `TYPE` keyword, they could be combinded to if we needed to. The following POST will match all files with the aspect `acme:securityClassified` applied \(this aspect is part of the default content model that comes with the SDK template projects\):

```
{
  "query": {
    "query": "+TYPE:\"cm:content\" AND +ASPECT:\"acme:securityClassified\"",
    "language": "afts"
  },
  "include": [
    "aspectNames"
  ],
  "paging": {
    "maxItems": "10",
    "skipCount": "0"
  },
  "sort": [{"type":"FIELD", "field":"cm:name", "ascending":"false"}]
}
```

Note also that we have requested to include the aspect names in the response. We can use the `include` JSON body parameter to return additional information. This works in the same way as in the **/nodes/\{id\}/children** method in the core API.

Here is how the call looks like, I have stored the query JSON data in a file called type-and-aspect-query.json:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@type-and-aspect-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1046    0   755  100   291  21571   8314 --:--:-- --:--:-- --:--:-- 29885
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 10
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-04T08:38:15.321+0000",
          "nodeType": "acme:document",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 61,
            "encoding": "ISO-8859-1"
          },
          "parentId": "3e59f24a-3a5b-4370-b98e-10e5514ac24e",
          "aspectNames": [
            "cm:versionable",
            "cm:titled",
            "cm:auditable",
            "acme:securityClassified",
            "cm:author"
          ],
          "createdAt": "2019-10-04T08:38:15.321+0000",
          "isFolder": false,
          "search": {
            "score": 1
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "anotherfile.txt",
          "location": "nodes",
          "id": "9b045d17-1aa4-4296-80e1-d7a39e858585"
        }
      }
    ]
  }
}
```

We can see in the response JSON that the `aspectNames` array contains the aspect we were matching.

## Search by tag

As you probably know, folder and file nodes can be tagged. If you have a lot of nodes tagged it make sense to be able to find stuff based on these tags.

We can use the `/search` API to search for files and folders that have been tagged. The POST body looks like this:

```
{
  "query": {
    "query": "+TAG:\"project-x\"",
    "language": "afts"
  }
}
```

In this case I want to search for all folders and files that have been tagged 'project-x'.

I have previously tagged a text file with this tag.

Here is how the call looks like, I have stored the query JSON data in a file called tag-query.json:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@tag-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   769    0   690  100    79   1869    214 --:--:-- --:--:-- --:--:--  2084
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "context": {
      "consistency": {
        "lastTxId": 64
      }
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-12-13T10:11:57.762+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 18,
            "encoding": "UTF-8"
          },
          "parentId": "d0ec1a36-0bda-40b9-8602-804b787f800e",
          "createdAt": "2019-12-02T13:31:35.619+0000",
          "isFolder": false,
          "search": {
            "score": 1
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "some-file.txt",
          "location": "nodes",
          "id": "7279b5c5-da55-4e98-8b12-72d33b90c810"
        }
      }
    ]
  }
}
```

One response is expected as I only got one file tagged with 'project-x'.

## Faceted search

Now when we have covered the basics let's look at a couple of the more interesting features of the search API, faceting and term highlighting.

There are two types of facets; queries and fields. A query facet returns the count of results for the given query, you can provide multiple facet queries in one request. A field facet returns a number of "buckets" for a field, providing the count of results that fit into each bucket.

It's much easier to understand with an example, the body below shows a search request that will look for files that have a `cm:name` or `cm:title` starting with "test". We also specify that we want to know how many of the results are small files, how many are plain text files, how many are images and how many are Office files. Additionally, we are also asking for the `creator` facet field to be included, which will indicate how many of the results were created by each user:

```
{
  "query": {
    "query": "(name:\"test*\" OR title:\"test*\") AND TYPE:\"cm:content\""
  },
  "facetQueries": [
    {"query": "content.size:[0 TO 10240]", "label": "Small Files"},
    {"query": "content.mimetype:'text/plain'", "label": "Plain Text"},
    {"query": "content.mimetype:'image/jpeg' OR content.mimetype:'image/png' OR content.mimetype:'image/gif'", "label": "Images"},
    {"query": "content.mimetype:'application/msword' OR content.mimetype:'application/vnd.ms-excel'", "label": "Office"}
  ], 
  "facetFields": {"facets": [{"field": "creator"}]}
}
```

Here is how the call looks like, I have stored the query JSON data in a file called facet-query.json:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@facet-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  6359    0  5793  100   566   141k  14150 --:--:-- --:--:-- --:--:--  159k
{
  "list": {
    "pagination": {
      "count": 9,
      "hasMoreItems": false,
      "totalItems": 9,
      "skipCount": 0,
      "maxItems": 100
    },
    "context": {
      "consistency": {
        "lastTxId": 193
      },
      "facetQueries": [
        {
          "label": "Office",
          "filterQuery": "content.mimetype:'application/msword' OR content.mimetype:'application/vnd.ms-excel'",
          "count": 3
        },
        {
          "label": "Small Files",
          "filterQuery": "content.size:[0 TO 10240]",
          "count": 3
        },
        {
          "label": "Plain Text",
          "filterQuery": "content.mimetype:'text/plain'",
          "count": 1
        },
        {
          "label": "Images",
          "filterQuery": "content.mimetype:'image/jpeg' OR content.mimetype:'image/png' OR content.mimetype:'image/gif'",
          "count": 3
        }
      ],
      "facetsFields": [
        {
          "label": "creator",
          "buckets": [
            {
              "label": "admin",
              "filterQuery": "creator:\"admin\"",
              "count": 9,
              "display": "Administrator"
            }
          ]
        }
      ]
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-11-07T10:43:43.279+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 9,
            "encoding": "UTF-8"
          },
          "parentId": "6b661ba4-830b-457d-af04-46f174351536",
          "createdAt": "2019-11-07T10:43:43.279+0000",
          "isFolder": false,
          "search": {
            "score": 1
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test-file.txt",
          "location": "nodes",
          "id": "9613e418-b1c1-4889-8866-4dccda66a258"
        }
      },
      ...
    ]
  }
}
```

As well as the expected list of files, the response also contains a `facetQueries` and a `facetsFields` object containing the counts we requested. The `facetQueries` object has an entry for each query supplied in the result whereas the `facetsFields` object contains an entry for each requested field which in turn contains the count for each bucket.

## Term highlighting search

The last example we're going to look at is term highlighting. The example body below shows a search request that will look for content nodes that have a name or title starting with "test", if the match occurs in either the `cm:name` or `cm:title` property the location of the match will be returned in the results. By default, the matched term is highlighted by surrounded by an `em` tag, to surround the match with something else the `prefix` and `postfix` properties can be used as shown in the example below:

```
{
  "query": {
    "query": "(name:\"test*\" OR title:\"test*\") AND TYPE:\"cm:content\""
  },
  "highlight": {
    "fields": [
      {
        "field": "cm:name",
        "prefix": "(",
        "postfix": ")"
      },
      {
        "field": "{http://www.alfresco.org/model/content/1.0}title"
      }
    ]
  }
}
```

Here is how the call looks like, I have stored the query JSON data in a file called highlight-query.json:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@highlight-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7101    0  6786  100   315  56082   2603 --:--:-- --:--:-- --:--:-- 58685
{
  "list": {
    "pagination": {
      "count": 10,
      "hasMoreItems": false,
      "totalItems": 10,
      "skipCount": 0,
      "maxItems": 100
    },
    "context": {
      "consistency": {
        "lastTxId": 193
      }
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-11-07T10:43:43.279+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 9,
            "encoding": "UTF-8"
          },
          "parentId": "6b661ba4-830b-457d-af04-46f174351536",
          "createdAt": "2019-11-07T10:43:43.279+0000",
          "isFolder": false,
          "search": {
            "score": 1,
            "highlight": [
              {
                "field": "cm:name",
                "snippets": [
                  "(test)-file.txt"
                ]
              }
            ]
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test-file.txt",
          "location": "nodes",
          "id": "9613e418-b1c1-4889-8866-4dccda66a258"
        }
      },
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-03T08:37:17.832+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "application/x-javascript",
            "mimeTypeName": "JavaScript",
            "sizeInBytes": 118,
            "encoding": "UTF-8"
          },
          "parentId": "fa62d870-061c-400f-a3c5-12a37fe0738e",
          "createdAt": "2019-10-03T08:37:17.832+0000",
          "isFolder": false,
          "search": {
            "score": 0.95773923,
            "highlight": [
              {
                "field": "cm:name",
                "snippets": [
                  "(test) return value.js.sample"
                ]
              }
            ]
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test return value.js.sample",
          "location": "nodes",
          "id": "6b0b7a4c-1630-47ec-9c2f-7620c1cefeed"
        }
      },
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-03T08:37:17.743+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "application/x-javascript",
            "mimeTypeName": "JavaScript",
            "sizeInBytes": 2271,
            "encoding": "UTF-8"
          },
          "parentId": "fa62d870-061c-400f-a3c5-12a37fe0738e",
          "createdAt": "2019-10-03T08:37:17.743+0000",
          "isFolder": false,
          "search": {
            "score": 0.3308143,
            "highlight": [
              {
                "field": "cm:name",
                "snippets": [
                  "example (test) script.js.sample"
                ]
              },
              {
                "field": "{http://www.alfresco.org/model/content/1.0}title",
                "snippets": [
                  "Example <em>Test</em> Script"
                ]
              }
            ]
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "example test script.js.sample",
          "location": "nodes",
          "id": "5d837ad9-4e7e-4eb9-9c41-1133f02c4cef"
        }
      },
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-11-08T13:39:34.040+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "application/msword",
            "mimeTypeName": "Microsoft Word",
            "sizeInBytes": 205312,
            "encoding": "UTF-8"
          },
          "parentId": "d87e0641-e44a-4e42-a88c-6d9765a74600",
          "createdAt": "2019-11-08T13:30:41.839+0000",
          "isFolder": false,
          "search": {
            "score": 0.32019404,
            "highlight": [
              {
                "field": "cm:name",
                "snippets": [
                  "SampleTemplate-(test.doc)"
                ]
              }
            ]
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "SampleTemplate-test.doc",
          "location": "nodes",
          "id": "6aa9d4ac-df1f-4c6d-9159-6f62821dd814"
        }
      },
      ...
    ]
  }
}
```

As we specified in the request, the match in the `cm:name` property is surrounded by brackets and the `em` tag surrounds the match in the `cm:title` property.

**Parent topic:**[Searching](../concepts/dev-api-by-language-alf-rest-searching-for-nodes.md)

