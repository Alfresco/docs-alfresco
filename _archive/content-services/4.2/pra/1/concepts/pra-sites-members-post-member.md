---
author: Alfresco Documentation
---

# Create a member of a site

Use this to create a new member of a specific site using a specific personId.

## Method

Using the HTTP POST method:-

```
sites/<siteId>/members
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com/members
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|email id|string|The id of the person.|
|role|enumerated type|string|The role for this person. Possible values are `SiteConsumer`, `SiteCollaborator`, `SiteContributor`and `SiteManager`.|

## Example POST body

```

{
  "id": "joe.bloggs@yourcompany.com",
  "role": "SiteConsumer"
}
```

## Response

-   If the siteId or personId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful a HTTP CREATED response \(status 201\) is returned.

## Example response body

```

{
   "entry":{
      "id":"fred.bloggs@yourcompany.com",
      "role":"SiteConsumer"
      }
}
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-members-methods.md)

