---
title: Filtering Paging and Sorting
---

## Searching by content type and controlling paging and sorting

The V1 ReST APIs paging can also be controlled but is accomplished via the body rather than a query parameter. The results can also be sorted. The body example shows how to execute a search to find all files ordered by the `cm:name` property. It shows how you can search for a specific content type with the `TYPE` keyword. It also only shows 25 results rather than the default 100 including skipping the first 10 results.

```json
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

This is what the call looks like assuming you have stored the query JSON data in a file called `paging-sort-query.json`:

```bash
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
           "name": "WebSiteReview.mp4",
...        }
      },
      {
        "entry": {
           "name": "turbine.JPG",
...        }
      },
      {
        "entry": {
           "name": "translatable.ftl",
...        }
      },
      {
        "entry": {
          "name": "text-file.txt",
...        }
      },
      {
          "name": "test return value.js.sample",
...        }
      },
      {
        "entry": {
          "name": "test-file.txt",
...        }
      },
      {
          "name": "system-overview.html",
...        }
      },
      {
        "entry": {
          "name": "start-pooled-review-workflow.js",
...        }
      },
      {
        "entry": {
          "name": "some-stuff.txt",
...        }
      },
      {
        "entry": {
          "name": "somefile.txt",
...        }
      },
 ...
    ]
  }
}
```

The results have been truncated for clarity.

## Faceted search

There are two types of facet queries, and fields. A query facet returns the count of results for the given query. You can provide multiple facet queries in one request. A field facet returns a number of "buckets" for a field, providing the count of results that fit into each bucket.

The example body shows a search request that looks for files that have a `cm:name` or `cm:title` starting with "test". You can also specify if you want to know how many of the results are small files, how many are plain text files, how many are images, and how many are Office files. Additionally, the `creator` facet field is included, which indicates how many of the results were created by each user:

```json
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

This is what the call looks like assuming you have stored the query JSON data in a file called `facet-query.json`:

```bash
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

The `facetQueries` object has an entry for each query supplied in the result whereas the `facetsFields` object contains an entry for each requested field which in turn contains the count for each bucket.
