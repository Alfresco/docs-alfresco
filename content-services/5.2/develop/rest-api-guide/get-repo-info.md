---
title: Getting Repository Information
---

Before you start using the ReST API it is useful to verify what exact version of ACS you are talking to, and what features it has enabled.

Now when we are logged in to the Repository we can start using the API. One of the first things we might want to do is verify exactly what version of ACS we are actually working with. This can be done with the Discovery API.

**http://localhost:8080/alfresco/api/discovery**

Note that this URL differ a bit from the other APIs as it does not use a version etc.

Call it as follows to get Repository information:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/discovery' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1094  100  1094    0     0  11763      0 --:--:-- --:--:-- --:--:-- 11763
{
  "entry": {
    "repository": {
      "edition": "Community",
      "version": {
        "major": "5",
        "minor": "2",
        "patch": "0",
        "hotfix": "0",
        "schema": 10005,
        "label": "r135134-b14",
        "display": "5.2.0.0 (r135134-b14) schema 10005"
      },
      "status": {
        "isReadOnly": false,
        "isAuditEnabled": true,
        "isQuickShareEnabled": true,
        "isThumbnailGenerationEnabled": true
      },
      "modules": [
        {
          "id": "acs-52-platform-jar",
          "title": "Alfresco Platform/Repository JAR Module",
          "description": "Platform/Repo JAR Module (to be included in the alfresco.war) - part of AIO - SDK 3",
          "version": "1.0-SNAPSHOT",
          "installState": "UNKNOWN",
          "versionMin": "0",
          "versionMax": "999"
        },
        {
          "id": "alfresco-share-services",
          "title": "Alfresco Share Services AMP",
          "description": "Module to be applied to alfresco.war, containing APIs for Alfresco Share",
          "version": "5.2.0",
          "installDate": "2019-11-15T14:49:00.475+0000",
          "installState": "INSTALLED",
          "versionMin": "5.1",
          "versionMax": "999"
        },
        {
          "id": "alfresco-trashcan-cleaner",
          "title": "alfresco-trashcan-cleaner project",
          "description": "The Alfresco Trash Can Cleaner (Alfresco Module)",
          "version": "2.2",
          "installState": "UNKNOWN",
          "versionMin": "0",
          "versionMax": "999"
        }
      ]
    }
  }
}
```

Looking at the response we can see that we are talking to an Community Edition of ACS version 5.2.0. So we are ready to move on and use the full API. Note also that it is easy to see what license that's applied and the number of extension modules (i.e. AMPs) that have been applied to the Repository.
