---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Finding sites by a term

Simple search for sites with a term.

|API Call|GET queries/sites?term=\{search term\}&orderBy=\{field\}|
|--------|--------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/queries/findSites](http://localhost:8080/api-explorer/#!/queries/findSites)|
|See also|[Complex search](dev-api-by-language-alf-rest-finding-content-by-search-query.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

The `/queries` endpoints are designed to be very simple to use and usable in "live search" scenarios. Meaning they can be executed upon each key press so clients can show results as the user types. The actual query used behind the scenes is hard-coded, if complex or custom queries are required the `/search` API should be used, which this section also covers.

To find sites by specifying a term \(i.e. a word\) you use a GET call as follows:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/queries/sites?term=\{search-term\}&orderBy=\{field\}**

This simple search query will look in the site id , site title and site description properties for a match. Let’s say we have a site with the word 'web' in the title, we can then search for it as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/queries/sites?term=web&orderBy=title' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   347    0   347    0     0   7081      0 --:--:-- --:--:-- --:--:--  7081
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "role": "SiteManager",
          "visibility": "PUBLIC",
          "guid": "b4cff62a-664d-4d45-9302-98723eac1319",
          "description": "This is a Sample Alfresco Team site.",
          "id": "swsdp",
          "preset": "site-dashboard",
          "title": "Sample: Web Site Design Project"
        }
      }
    ]
  }
}
```

You can use the `fields` parameters to return more or less metadata in the response.

**Parent topic:**[Searching](../concepts/dev-api-by-language-alf-rest-searching-for-nodes.md)

