---
author: Alfresco Documentation
---

# Get a preference

Use this to get the value of a specific preference for a specific person.

## Method

Using the HTTP GET method:-

```

people/<personId>/preferences/<preferenceId>
```

A personID is always the email address that they registered with.

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/preferences/org.alfresco.share.documents.favourites
```

## Response

-   If the personId or the preferenceId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
   "entry":{
      "value":"4452493d-675f-42f2-9fb9-50ee97c8c5c9,b8a10d93-b383-4127-9f36-ff0ec5f2c450",
      "id":"org.alfresco.share.documents.favourites"
   }
}
```

**Parent topic:**[Preferences](../../../pra/1/concepts/pra-people-preferences.md)

