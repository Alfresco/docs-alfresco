---
title: Get Repository Information
---

Before you start using the ReST API it is useful to verify what exact version of ACS you are talking to, and what 
features it has enabled.

Now when we are logged in to the Repository we can start using the API. One of the first things we might want to do is 
verify exactly what version of ACS we are actually working with. This can be done with the Discovery API.

`http://localhost:8080/alfresco/api/discovery`

Note that this URL differ a bit from the other APIs as it does not use a version etc.

Call it as follows to get Repository information:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/discovery' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1728    0  1728    0     0  20819      0 --:--:-- --:--:-- --:--:-- 20819
{
  "entry": {
    "repository": {
      "id": "f5e9297e-793d-4cde-95a2-cdd415ad3087",
      "edition": "Enterprise",
      "version": {
        "major": "6",
        "minor": "1",
        "patch": "0",
        "hotfix": "0",
        "schema": 12001,
        "label": "r1f587115-b67",
        "display": "6.1.0.0 (r1f587115-b67) schema 12001"
      },
      "license": {
        "issuedAt": "2019-09-25T08:40:30.777+0000",
        "expiresAt": "2019-10-25T00:00:00.000+0000",
        "remainingDays": 30,
        "holder": "Trial User",
        "mode": "ENTERPRISE",
        "entitlements": {
          "isClusterEnabled": true,
          "isCryptodocEnabled": false
        }
      },
      "status": {
        "isReadOnly": false,
        "isAuditEnabled": true,
        "isQuickShareEnabled": true,
        "isThumbnailGenerationEnabled": true
      },
      "modules": [
        {
          "id": "alfresco-aos-module",
          "title": "Alfresco Office Services Module",
          "description": "Allows applications that can talk to a SharePoint server to talk to your Alfresco installation",
          "version": "1.2.2",
          "installDate": "2019-02-19T09:03:46.731+0000",
          "installState": "INSTALLED",
          "versionMin": "6.0",
          "versionMax": "999"
        },
        {
          "id": "org.alfresco.integrations.google.docs",
          "title": "Alfresco / Google Docs Integration",
          "description": "The Repository side artifacts of the Alfresco / Google Docs Integration.",
          "version": "3.1.0",
          "installDate": "2019-02-19T09:03:46.822+0000",
          "installState": "INSTALLED",
          "versionMin": "6.0.0",
          "versionMax": "6.99.99"
        },
        {
          "id": "alfresco-share-services",
          "title": "Alfresco Share Services AMP",
          "description": "Module to be applied to alfresco.war, containing APIs for Alfresco Share",
          "version": "6.1.0",
          "installDate": "2019-02-19T09:03:46.875+0000",
          "installState": "INSTALLED",
          "versionMin": "6.1",
          "versionMax": "999"
        },
        {
          "id": "alfresco-trashcan-cleaner",
          "title": "alfresco-trashcan-cleaner project",
          "description": "The Alfresco Trashcan Cleaner (Alfresco Module)",
          "version": "2.3",
          "installState": "UNKNOWN",
          "versionMin": "0",
          "versionMax": "999"
        }
      ]
    }
  }
}
```

Looking at the response we can see that we are talking to an Enterprise Edition of ACS version 6.1.0. So we are ready to 
move on and use the full API. Note also that it is easy to see what license that's applied and the number of extension 
modules (i.e. AMPs) that have been applied to the Repository.
