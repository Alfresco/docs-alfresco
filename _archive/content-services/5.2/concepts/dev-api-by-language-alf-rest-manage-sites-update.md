---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Update a site

Updating the metadata for an Alfresco Share site.

|API Call|PUT sites/\{id\}|
|--------|----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/sites/updateSite](http://localhost:8080/api-explorer/#!/sites/updateSite)|
|See also|[How to create a site](dev-api-by-language-alf-rest-manage-sites-create.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

It’s also possible to update the site metadata after the site has been created. We can for example change the description and title, and it is even possible to change the visibility of the site. Use the following PUT call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/\{id\}**

The identifier for the site to be updated is specified with the `{id}` parameter.

The body for a site update call looks like this:

```
{
  "title": "{the updated name of the site}",
  "description": "{the updated description of the site}",
  "visibility": "[PUBLIC|PRIVATE|MODERATED]"
}
```

To update a site with the 'my-stuff' `id` make the following call:

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My stuff UPDATED", "description": "My stuff Desc UPDATED", "visibility": "PRIVATE"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/my-stuff' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   303    0   208  100    95   1004    458 --:--:-- --:--:-- --:--:--  1463
{
  "entry": {
    "role": "SiteManager",
    "visibility": "PRIVATE",
    "guid": "7ef8798f-bbcd-4d92-8db5-4d51edf739f6",
    "description": "My stuff Desc UPDATED",
    "id": "my-stuff",
    "preset": "site-dashboard",
    "title": "My stuff UPDATED"
  }
}
```

The updated site metadata is returned so you can make sure it's correct.

**Parent topic:**[Managing Sites](../concepts/dev-api-by-language-alf-rest-manage-sites-intro.md)

