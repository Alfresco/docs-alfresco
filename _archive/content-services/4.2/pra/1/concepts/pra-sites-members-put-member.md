---
author: Alfresco Documentation
---

# Update a member of a site

Use this to update an existing member of a site.

## Method

Using the HTTP PUT method:-

```
sites/<siteId>/members/<personId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com/members/joe.bloggs@yourcompany.com
```

## PUT body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|role|enumerated type|string|The new role for this person. Possible values are `SiteConsumer`, `SiteCollaborator`, `SiteContributor`, and `SiteManager`.|

## Example PUT body

```

{
  'role': 'SiteManager'
}
```

## Response

-   If siteId, personId, or role do not exist an HTTP Not Found \(status 404\) is returned with a Not Found.
-   If the personId supplied is not a member of the site an HTTP Bad Request \(status 400\) is returned with an Bad Request.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
   "entry":{
      "id":"joe.bloggs@yourcompany.com",
      "role":"SiteManager"
      }
}
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-members-methods.md)

