---
author: Alfresco Documentation
---

# Get information about a person's site membership

Get information about a person's membership of a specific site.

## Method

Using the HTTP GET method:

```
people/<personId>/sites/<siteId>
```

A personID is always the email address that they registered with

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/sites/fred-bloggs-yourcompany-com
```

## Response

-   If the siteId or personId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
  "entry" : {
    "site" : {
      "id" : "fred-bloggs-yourcompany-com",
      "title" : "Fred Bloggs's Home",
      "visibility" : "PRIVATE",
      "description" : "Fred Bloggs's private home site."
    },
    "id" : "fred-bloggs-yourcompany-com",
    "role" : "SiteManager"
  }
}
```

Note that the response object is an entry containing a [Members](pra-sites-members.md) entity with an embedded [Sites](pra-sites.md) entity.

**Parent topic:**[Sites](../../../pra/1/concepts/pra-people-sites.md)

