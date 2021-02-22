---
author: Alfresco Documentation
---

# Get information for a container

Use this to get the container object for a specific container id.

## Method

Using the HTTP GET method:

```

sites/<siteId>/containers/<containerId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com/containers/7fb6c69b-f462-429a-a168-87762f660c65
```

## Response

-   If the siteId or containerId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
      "entry":{
         "folderId":"documentLibrary",
         "id":"7fb6c69b-f462-429a-a168-87762f660c65"
      }
}
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-containers-methods.md)

